export function applyMask(value: string, mask: string): string {
  let formattedValue = value.replace(/\D/g, '');
  let i = 0;

  return mask.replace(/9/g, () => formattedValue[i++] || '');
}
