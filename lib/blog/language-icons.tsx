import { 
  SiPython, 
  SiJavascript, 
  SiTypescript,
  SiCss3,
  SiHtml5,
  SiMarkdown,
  SiJson,
  SiYaml,
  SiGnubash,
  SiRust,
  SiGo,
  SiPhp,
  SiRuby,
  SiSwift,
  SiKotlin,
  SiCplusplus,
  SiC,
  SiDocker,
  SiGit,
} from "react-icons/si"
import { 
  VscTerminalBash, 
  VscJson, 
  VscCode,
  VscFileCode,
} from "react-icons/vsc"
import { IconType } from "react-icons"

/**
 * Language Icons Mapping
 * 
 * Maps programming language strings to their corresponding React Icon components
 * Used in BlogCodeBlock to display language icons alongside language names
 */

type LanguageIconMap = {
  [key: string]: IconType
}

const LANGUAGE_ICONS: LanguageIconMap = {
  // Popular languages
  python: SiPython,
  py: SiPython,
  javascript: SiJavascript,
  js: SiJavascript,
  jsx: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  tsx: SiTypescript,
  
  // Shell/Terminal
  bash: SiGnubash,
  sh: SiGnubash,
  shell: VscTerminalBash,
  zsh: VscTerminalBash,
  fish: VscTerminalBash,
  
  // Web languages
  css: SiCss3,
  scss: SiCss3,
  sass: SiCss3,
  html: SiHtml5,
  htm: SiHtml5,
  
  // Data formats
  json: SiJson,
  jsonc: VscJson,
  yaml: SiYaml,
  yml: SiYaml,
  toml: VscFileCode,
  
  // Markup
  markdown: SiMarkdown,
  md: SiMarkdown,
  mdx: SiMarkdown,
  
  // Systems languages
  rust: SiRust,
  rs: SiRust,
  go: SiGo,
  c: SiC,
  cpp: SiCplusplus,
  "c++": SiCplusplus,
  
  // Other popular languages
  php: SiPhp,
  ruby: SiRuby,
  rb: SiRuby,
  swift: SiSwift,
  kotlin: SiKotlin,
  kt: SiKotlin,
  
  // Tools
  docker: SiDocker,
  dockerfile: SiDocker,
  git: SiGit,
  gitignore: SiGit,
  
  // Fallback for unknown
  text: VscFileCode,
  txt: VscFileCode,
  plaintext: VscFileCode,
}

/**
 * Get the appropriate icon component for a given language
 * 
 * @param language - The language identifier (e.g., "python", "javascript")
 * @returns React Icon component or fallback icon
 * 
 * @example
 * ```tsx
 * const Icon = getLanguageIcon("python")
 * return <Icon className="w-5 h-5" />
 * ```
 */
export function getLanguageIcon(language: string): IconType {
  const normalizedLang = language.toLowerCase().trim()
  return LANGUAGE_ICONS[normalizedLang] || VscCode
}

/**
 * Get a formatted language display name
 * Converts language identifiers to user-friendly names
 * 
 * @param language - The language identifier
 * @returns Formatted display name
 * 
 * @example
 * ```tsx
 * getLanguageDisplayName("py") // returns "Python"
 * getLanguageDisplayName("js") // returns "JavaScript"
 * ```
 */
export function getLanguageDisplayName(language: string): string {
  const displayNames: { [key: string]: string } = {
    py: "Python",
    js: "JavaScript",
    jsx: "JavaScript",
    ts: "TypeScript",
    tsx: "TypeScript",
    sh: "Shell",
    bash: "Bash",
    zsh: "Zsh",
    fish: "Fish",
    md: "Markdown",
    mdx: "MDX",
    yml: "YAML",
    rb: "Ruby",
    rs: "Rust",
    kt: "Kotlin",
    cpp: "C++",
    "c++": "C++",
  }

  const normalized = language.toLowerCase().trim()
  
  // Return mapped name or capitalize first letter
  return (
    displayNames[normalized] || 
    language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()
  )
}

/**
 * Check if a language has an icon available
 * 
 * @param language - The language identifier
 * @returns true if icon exists, false otherwise
 */
export function hasLanguageIcon(language: string): boolean {
  const normalizedLang = language.toLowerCase().trim()
  return normalizedLang in LANGUAGE_ICONS
}

/**
 * List of all supported language identifiers
 */
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_ICONS)
