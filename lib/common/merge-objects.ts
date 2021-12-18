export const mergeObjects = (
  a: { [key: string]: number },
  b: { [key: string]: number }
) => {
  const result = { ...a };
  for (const key in b) {
    if (b.hasOwnProperty(key)) {
      if (result.hasOwnProperty(key)) {
        result[key] += b[key];
      } else {
        result[key] = b[key];
      }
    }
  }
  return result;
};

export const mergeMultipleObjects = (
  distribuicoes: { [key: string]: number }[]
) => {
  let result = {};
  for (const distribuicao of distribuicoes) {
    result = mergeObjects(result, distribuicao);
  }
  return result;
};
