import { cnaeToSecao } from "@domain/util/cnae-to-secao";
import cnae from "@json-assets/cnae.json";

const reduceDesc = (obj: { [k: string]: { descricao: string } }) =>
  Object.entries(obj).reduce((acc, entry) => {
    acc[entry[0]] = entry[1]?.descricao;
    return acc;
  }, {} as { [key: string]: string | undefined });

export type CNAEClassifier = (cnae: string) => string;

export const CNAEClassifiers: {
  name: string;
  classifier: CNAEClassifier;
  labels: {
    [key: string]: string | undefined;
  };
}[] = [
  {
    name: "Seção",
    classifier: (cnae: string) => cnaeToSecao(cnae) + "",
    labels: reduceDesc(cnae.secoes),
  },
  {
    name: "Divisão",
    classifier: (cnae: string) => cnae.substr(0, 2) + "",
    labels: reduceDesc(cnae.divisoes),
  },
  {
    name: "Grupo",
    classifier: (cnae: string) => cnae.substr(0, 3) + "",
    labels: reduceDesc(cnae.grupos),
  },
  {
    name: "Classe",
    classifier: (cnae: string) => cnae.substr(0, 5) + "",
    labels: reduceDesc(cnae.classes),
  },
  {
    name: "Subclasse",
    classifier: (cnae: string) => cnae.substr(0, 8) + "",
    labels: reduceDesc(cnae.subclasses),
  },
];
