export const rowToObject = (header: string[]) => (row: string[]) =>
  header.reduce(
    (acc, key, index) => ({
      ...acc,
      [key]: row[index],
    }),
    {}
  );
