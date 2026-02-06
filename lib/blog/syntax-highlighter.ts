"use server"

import { createHighlighter, type Highlighter, type BundledLanguage } from 'shiki'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as crypto from 'crypto'

let highlighterInstance: Highlighter | null = null

// Supported languages list
const SUPPORTED_LANGUAGES: BundledLanguage[] = [
  'python',
  'javascript',
  'typescript',
  'jsx',
  'tsx',
  'bash',
  'shell',
  'json',
  'yaml',
  'markdown',
  'css',
  'html',
  'sql',
  'rust',
  'go',
  'java',
  'c',
  'cpp',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'scala',
  'r',
  'lua',
  'perl',
  'haskell',
  'elixir',
  'clojure',
  'dockerfile',
  'nginx',
  'graphql',
  'xml',
  'toml',
  'ini',
  'diff',
  'git-commit',
  'git-rebase',
  'makefile',
  'cmake',
]

/**
 * Get or create Shiki highlighter instance (singleton)
 */
async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['min-light', 'min-dark'],
      langs: SUPPORTED_LANGUAGES,
    })
  }
  return highlighterInstance
}

/**
 * Normalize language aliases
 */
function normalizeLanguage(lang: string): string {
  const aliases: Record<string, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'sh': 'bash',
    'zsh': 'bash',
    'yml': 'yaml',
    'md': 'markdown',
    'dockerfile': 'dockerfile',
    'docker': 'dockerfile',
    'rs': 'rust',
    'rb': 'ruby',
    'kt': 'kotlin',
    'ex': 'elixir',
    'exs': 'elixir',
    'hs': 'haskell',
    'clj': 'clojure',
    'pl': 'perl',
  }
  return aliases[lang.toLowerCase()] || lang.toLowerCase()
}

/**
 * Check if language is supported
 */
function isLanguageSupported(lang: string): boolean {
  const normalized = normalizeLanguage(lang)
  return SUPPORTED_LANGUAGES.includes(normalized as BundledLanguage)
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, char => map[char])
}

/**
 * Generate cache key for highlighted code
 */
function getCacheKey(code: string, language: string, theme: string): string {
  const hash = crypto.createHash('md5')
  hash.update(`${code}-${language}-${theme}-v2`) // v2 for cache invalidation
  return hash.digest('hex')
}

/**
 * Get cache directory path
 */
function getCacheDir(): string {
  return path.join(process.cwd(), '.cache', 'syntax-highlighting')
}

/**
 * Read from cache
 */
async function readFromCache(cacheKey: string): Promise<string | null> {
  try {
    const cacheDir = getCacheDir()
    const cachePath = path.join(cacheDir, `${cacheKey}.html`)
    const content = await fs.readFile(cachePath, 'utf-8')
    return content
  } catch {
    return null
  }
}

/**
 * Write to cache
 */
async function writeToCache(cacheKey: string, content: string): Promise<void> {
  try {
    const cacheDir = getCacheDir()
    await fs.mkdir(cacheDir, { recursive: true })
    const cachePath = path.join(cacheDir, `${cacheKey}.html`)
    await fs.writeFile(cachePath, content, 'utf-8')
  } catch (error) {
    console.warn('Failed to write to cache:', error)
  }
}

/**
 * Clean up Shiki HTML output to work with our brutalist styling
 * Removes inline background colors but keeps text colors
 */
function cleanShikiHtml(html: string, isDark: boolean = false): string {
  // Remove the pre wrapper and background-color from it
  // We want to keep only the code content with color spans
  let cleaned = html
  
  // Remove background-color from pre and code elements
  cleaned = cleaned.replace(/background-color:[^;"]+;?/g, '')
  
  // Remove pre wrapper styles but keep the content
  cleaned = cleaned.replace(/<pre[^>]*class="shiki[^"]*"[^>]*style="[^"]*"[^>]*>/g, '<pre class="shiki">')
  
  // Remove any remaining inline background styles
  cleaned = cleaned.replace(/style="background-color:[^"]*"/g, '')
  
  // Fix comment contrast in dark mode - Min Dark theme gray (#6B737C) is too dark
  // Replace with a lighter gray (#8b949e) for better readability
  if (isDark) {
    cleaned = cleaned.replace(/color:#6B737C/gi, 'color:#8b949e')
    cleaned = cleaned.replace(/color:#6b737c/gi, 'color:#8b949e')
  }
  
  return cleaned
}

/**
 * Highlight code with Min theme for both light and dark modes
 * Returns object with both versions
 */
export async function highlightCode(
  code: string,
  language: string
): Promise<{ light: string; dark: string }> {
  const normalizedLang = normalizeLanguage(language)
  
  // Check if language is supported
  if (!isLanguageSupported(normalizedLang)) {
    console.warn(`Language "${language}" not supported, falling back to plain text`)
    const escaped = escapeHtml(code)
    const fallback = `<pre class="shiki"><code>${escaped}</code></pre>`
    return { light: fallback, dark: fallback }
  }
  
  try {
    const highlighter = await getHighlighter()
    
    // Generate both light and dark versions
    const lightHtml = highlighter.codeToHtml(code, {
      lang: normalizedLang as BundledLanguage,
      theme: 'min-light',
    })
    
    const darkHtml = highlighter.codeToHtml(code, {
      lang: normalizedLang as BundledLanguage,
      theme: 'min-dark',
    })
    
    return {
      light: cleanShikiHtml(lightHtml, false),
      dark: cleanShikiHtml(darkHtml, true),
    }
    
  } catch (error) {
    console.error(`Failed to highlight code (${language}):`, error)
    // Fallback: return plain escaped HTML
    const escaped = escapeHtml(code)
    const fallback = `<pre class="shiki"><code>${escaped}</code></pre>`
    return { light: fallback, dark: fallback }
  }
}

/**
 * Highlight code with file-based caching
 */
export async function highlightCodeCached(
  code: string,
  language: string
): Promise<{ light: string; dark: string }> {
  // Check cache for both themes
  const lightKey = getCacheKey(code, language, 'min-light')
  const darkKey = getCacheKey(code, language, 'min-dark')
  
  const cachedLight = await readFromCache(lightKey)
  const cachedDark = await readFromCache(darkKey)
  
  if (cachedLight && cachedDark) {
    return { light: cachedLight, dark: cachedDark }
  }
  
  // Cache miss - highlight and store
  const highlighted = await highlightCode(code, language)
  
  await writeToCache(lightKey, highlighted.light)
  await writeToCache(darkKey, highlighted.dark)
  
  return highlighted
}

/**
 * Extract code blocks from MDX content
 * Returns array of { fullMatch, language, code, startIndex }
 */
function extractCodeBlocks(content: string): Array<{
  fullMatch: string
  language: string
  code: string
  startIndex: number
}> {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const blocks: Array<{
    fullMatch: string
    language: string
    code: string
    startIndex: number
  }> = []
  
  let match
  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      fullMatch: match[0],
      language: match[1] || 'text',
      code: match[2],
      startIndex: match.index,
    })
  }
  
  return blocks
}

/**
 * Process MDX content and highlight all code blocks
 * Returns processed content with embedded light/dark HTML
 */
export async function highlightCodeBlocks(mdxContent: string): Promise<string> {
  const blocks = extractCodeBlocks(mdxContent)
  
  if (blocks.length === 0) {
    return mdxContent
  }
  
  let processedContent = mdxContent
  
  // Process in reverse order to maintain correct indices
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i]
    
    // Skip plain text blocks
    if (block.language === 'text' || block.language === 'plaintext') {
      continue
    }
    
    const { light, dark } = await highlightCodeCached(block.code.trim(), block.language)
    
    // Create special marker that contains both versions
    // CSS will show/hide based on theme
    const replacement = `<CodeHighlighted language="${block.language}" lightHtml={${JSON.stringify(light)}} darkHtml={${JSON.stringify(dark)}} rawCode={${JSON.stringify(block.code.trim())}} />`
    
    processedContent = 
      processedContent.slice(0, block.startIndex) + 
      replacement + 
      processedContent.slice(block.startIndex + block.fullMatch.length)
  }
  
  return processedContent
}

/**
 * Synchronously process a single code block
 * Used when we already have the code and language extracted
 */
export async function getHighlightedCode(
  code: string,
  language: string
): Promise<{ light: string; dark: string }> {
  return highlightCodeCached(code, language)
}
