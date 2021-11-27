import { PrismaClient } from ".prisma/client";
import { IEmpresa } from "@domain/entities/empresa";
import { IEmpresaRepository } from "./empresa.repository";

export class EmpresaRepositoryPrisma implements IEmpresaRepository {
  client = new PrismaClient();

  async upsert(data: IEmpresa) {
    return this.client.empresa
      .upsert({
        create: data,
        update: data,
        where: { idEstrangeira: data.idEstrangeira, cnpj: data.cnpj },
      })
      .then((res) => res as IEmpresa);
  }

  async end() {
    return this.client.$disconnect();
  }
}
