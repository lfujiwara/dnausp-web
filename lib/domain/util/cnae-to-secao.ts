type SecaoEntry = [number, number, string];

const isWithinSecao = (divisao: number, secaoEntry: SecaoEntry) => {
  const [min, max, key] = secaoEntry;
  if (divisao >= min && divisao <= max) return key;
};

const secaoEntries = [
  [1, 3, "A"],
  [5, 9, "B"],
  [10, 33, "C"],
  [35, 35, "D"],
  [36, 39, "E"],
  [41, 43, "F"],
  [45, 47, "G"],
  [49, 53, "H"],
  [55, 56, "I"],
  [58, 63, "J"],
  [64, 66, "K"],
  [68, 68, "L"],
  [69, 75, "M"],
  [77, 82, "N"],
  [84, 84, "O"],
  [85, 85, "P"],
  [86, 88, "Q"],
  [90, 93, "R"],
  [94, 96, "S"],
  [97, 97, "T"],
  [99, 99, "U"],
] as [number, number, string][];

export const cnaeToSecao = (cnae: string) => {
  const divisao = parseInt(cnae.substring(0, 2), 10);
  for (const entry of secaoEntries) {
    const secao = isWithinSecao(divisao, entry);
    if (secao) return secao;
  }
};
