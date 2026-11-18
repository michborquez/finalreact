// Muestra primera, última y las vecinas de la actual: 1 … 4 5 6 … 12
export function armarPaginas(actual, total) {
  const numeros = [...new Set([1, total, actual - 1, actual, actual + 1])]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  const items = [];
  numeros.forEach((n, i) => {
    if (i > 0 && n - numeros[i - 1] > 1) items.push({ gap: true, key: `gap-${n}` });
    items.push({ gap: false, key: n, numero: n });
  });
  return items;
}
