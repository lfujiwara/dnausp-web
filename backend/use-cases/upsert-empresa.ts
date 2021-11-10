import { Result, TResult } from "@common/result";
import { IEmpresa } from "@domain/entities/empresa";
import { EmpresaFactory } from "@domain/factories/empresa.factory";
import { IEmpresaRepository } from "backend/data/empresa.repository";

export class UpsertEmpresaUseCase {
  constructor(private repository: IEmpresaRepository) {}

  async execute(
    _empresa: IEmpresa
  ): Promise<
    TResult<IEmpresa, { empresa: IEmpresa; errors: string[]; warns: string[] }>
  > {
    const resultEmpresa = EmpresaFactory.create(_empresa);

    if (resultEmpresa.isOk()) {
      const empresa = await this.repository.upsert(resultEmpresa.value.empresa);
      return Result.ok(empresa);
    }

    return Result.err({ empresa: _empresa, ...resultEmpresa.value });
  }
}
