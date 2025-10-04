import { signIn } from '@/auth';
import { ItemListI } from '../components/shared/itemList';
import { NavElement } from '../components/sidebar/navegation';

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
    svg = svg.replace(/fill="#[0-9a-fA-F]{3,6}"/g, `fill="${colorWithHash}"`);
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

/**
 * Compara el pathname con el link devuelve true si es igual
 *
 * @param pathname - Ruta actual
 * @param link - String cualquiera
 * @returns  Booleando
 */
export const isActive = (
  pathname: string,
  link: string,
  includes?: boolean
): boolean => {
  console.log('link:', link, '__', pathname);

  return includes
    ? pathname === link || pathname.endsWith(link)
    : pathname === link;
};

/**
 * Genera una lista de elementos de navegación a partir de una matriz de items.
 *
 * - Cada grupo (`ItemListI[]`) se convierte en un objeto `NavElement`.
 * - Se genera un `id` único para cada elemento con `crypto.randomUUID()`.
 * - Se puede asignar un título opcional a un grupo si coincide con el `index` proporcionado en `opts`.
 *
 * @param elements - Matriz de matrices de items (`ItemListI[][]`), cada subarreglo representa un grupo de items de navegación.
 * @param opts - Objeto opcional para asignar título:
 *   - `index`: posición (1-based) del grupo al que se le aplicará el título.
 *   - `title`: título a asignar al grupo correspondiente.
 * @returns Lista de elementos de navegación (`NavElement[]`).
 */
export const generateNavElements = (
  elements: ItemListI[][],
  opts?: { index: number; title: string }
): NavElement[] => {
  return elements.map((el, index) => ({
    id: crypto.randomUUID(),
    items: el,
    title: opts?.index === index + 1 ? opts.title : undefined,
  }));
};

export const formatDate = (date: string) => {
  const dateFromParam = new Date(date);

  const formatedDate = dateFromParam.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return formatedDate;
};
