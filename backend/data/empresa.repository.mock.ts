import { IEmpresa } from "@domain/entities/empresa";
import { IEmpresaRepository } from "./empresa.repository";

export class EmpresaRepositoryMock implements IEmpresaRepository {
  upsert(empresa: IEmpresa): Promise<IEmpresa> {
    return Promise.resolve(empresa);
  }
}
