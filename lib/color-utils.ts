/**
 * Converte RGB string (ex: "rgb(250, 250, 250)") para hex (ex: "#fafafa")
 */
export function rgbToHex(rgb: string): string {
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return rgb
  
  const r = parseInt(match[1])
  const g = parseInt(match[2])
  const b = parseInt(match[3])
  
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

/**
 * Calcula se uma cor é clara ou escura baseado em luminância
 * Retorna true se for clara, false se for escura
 */
export function isLightColor(color: string): boolean {
  let r: number, g: number, b: number
  
  if (color.startsWith('rgb')) {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (!match) return true
    r = parseInt(match[1])
    g = parseInt(match[2])
    b = parseInt(match[3])
  } else if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else {
    return true
  }
  
  // Calcular luminância (fórmula W3C)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

/**
 * Retorna a cor inversa para contraste (preto ou branco)
 */
export function getContrastColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#ffffff'
}
