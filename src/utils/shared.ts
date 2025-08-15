/**
 * Modifica un SVG string permitiendo cambiar color (stroke) y dimensiones.
 * Si el SVG no tiene viewBox, se le agrega uno.
 *
 * @param svgString - Código HTML del SVG
 * @param options - Opciones de modificación
 * @param options.color - Color en HEX (con o sin #) para stroke
 * @param options.width - Ancho opcional del SVG
 * @param options.height - Alto opcional del SVG
 * @returns SVG modificado como string
 */
export const modifySvg = (
  svgString: string,
  options?: {
    color?: string;
    width?: number | string;
    height?: number | string;
  }
) => {
  if (!svgString || typeof svgString !== 'string') return svgString;

  let svg = svgString;

  // Reemplazar stroke si hay color
  if (options?.color) {
    const colorWithHash = options.color.startsWith('#')
      ? options.color
      : `#${options.color}`;
    svg = svg.replace(
      /stroke="#[0-9a-fA-F]{3,6}"/g,
      `stroke="${colorWithHash}"`
    );
     svg = svg.replace(
      /fill="#[0-9a-fA-F]{3,6}"/g,
      `fill="${colorWithHash}"`
    );
  }

  // Cambiar width y height si se pasan
  if (options?.width) {
    svg = svg.replace(/width="(\d+)(px)?"/, `width="${options.width}"`);
  }
  if (options?.height) {
    svg = svg.replace(/height="(\d+)(px)?"/, `height="${options.height}"`);
  }

  // Agregar viewBox si no existe
  if (!/viewBox="/.test(svg)) {
    const widthMatch = svg.match(/width="(\d+)/);
    const heightMatch = svg.match(/height="(\d+)/);
    const w = widthMatch ? parseInt(widthMatch[1], 10) : 24;
    const h = heightMatch ? parseInt(heightMatch[1], 10) : 24;
    svg = svg.replace(/<svg([^>]+)>/, `<svg$1 viewBox="0 0 ${w} ${h}">`);
  }

  return svg;
};
