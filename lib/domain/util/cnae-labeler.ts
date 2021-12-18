import cnaeData from "@json-assets/cnae.json";

const cnaeDict = [
  cnaeData.secoes,
  cnaeData.divisoes,
  cnaeData.grupos,
  cnaeData.classes,
  cnaeData.subclasses,
]
  .map((o) => Object.values(o))
  .flat()
  .reduce((acc, cur) => {
    acc[cur.id] = cur.descricao;
    return acc;
  }, {});

export const cnaeLabeler = (cnae: string) => cnaeDict[cnae] || cnae;
