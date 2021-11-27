import { IEmpresa } from "@domain/entities/empresa";

export type IUseUpsertEmpresa = IEmpresa[];

export const useUpsertEmpresa = () => {
  return (empresas: IEmpresa[]) =>
    fetch("/api/upsert-empresa", {
      method: "POST",
      body: JSON.stringify(empresas),
    }).then((res) => res.json());
};
