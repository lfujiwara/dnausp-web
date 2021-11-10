// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IEmpresa } from "@domain/entities/empresa";
import { EmpresaFactory } from "@domain/factories/empresa.factory";
import { EmpresaRepositoryPrisma } from "backend/data/empresa.repository.prisma";
import { UpsertEmpresaUseCase } from "backend/use-cases/upsert-empresa";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const empresas: EmpresaFactory.Input[] = JSON.parse(req.body);

  if (req.method === "POST") {
    const repository = new EmpresaRepositoryPrisma();
    const useCase = new UpsertEmpresaUseCase(repository);
    const result = {
      ok: [] as IEmpresa[],
      errors: [] as any[],
    };
    const promises = [];
    for (const empresa of empresas) {
      promises.push(
        useCase
          .execute(empresa)
          .then((r) =>
            r.isOk() ? result.ok.push(r.value) : result.errors.push(r.value)
          )
      );
    }

    await Promise.all(promises);
    await repository.end();
    return res.status(201).json(result);
  }

  res.status(200).json(empresas);
}
