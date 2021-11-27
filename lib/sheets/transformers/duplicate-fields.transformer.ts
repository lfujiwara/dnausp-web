export const duplicateFieldsTransformer = (fields: string[]) => {
  const count: { [key: string]: number } = {};

  const get = (key: string) => {
    if (count[key] === undefined) count[key] = 0;
    return count[key]++;
  };

  return fields.map((f) => {
    const n = get(f);
    return n === 0 ? f : `${f}__${n}`;
  });
};
