import type { TOCHeading } from "./types"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/--+/g, "-") // Remove hífens múltiplos
    .trim()
}

export function generateTOC(content: string): TOCHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TOCHeading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
      id: slugify(match[2]),
    })
  }

  return headings
}
