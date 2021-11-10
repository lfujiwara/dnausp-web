import { IEmpresa } from "@domain/entities/empresa";

export interface IEmpresaRepository {
  upsert(empresa: IEmpresa): Promise<IEmpresa>;
}
