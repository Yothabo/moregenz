/**
 * Mix two hex colors at a given weight.
 * Used to compute values that CSS color-mix() can't reliably resolve inside
 * custom properties on all browsers (especially mobile).
 */

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function mixHex(color1: string, color2: string, weight1: number): string {
  const w1 = Math.max(0, Math.min(1, weight1));
  const w2 = 1 - w1;

  if (!color1.startsWith('#') || !color2.startsWith('#')) {
    // If either isn't hex, return color1 as fallback
    return color1;
  }

  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  return rgbToHex(
    r1 * w1 + r2 * w2,
    g1 * w1 + g2 * w2,
    b1 * w1 + b2 * w2,
  );
}
