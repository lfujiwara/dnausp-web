import { Result, TResult } from "@common/result";
import { IEmpresa } from "@domain/entities/empresa";
import { validateCNAE } from "@domain/validation/cnae";
import { validateCNPJ } from "@domain/validation/cnpj";
import { validateNome } from "@domain/validation/nome";
import { validateSituacaoReceita } from "@domain/validation/situacao-receita";

export namespace EmpresaFactory {
  export type Input = IEmpresa;
}

export class EmpresaFactory {
  public static create(
    input: EmpresaFactory.Input
  ): TResult<
    { empresa: IEmpresa; errors: string[]; warns: string[] },
    { errors: string[]; warns: string[] }
  > {
    const empresa = {} as IEmpresa;
    const errors: string[] = [];
    const warns: string[] = [];

    // CNPJ válido + Empresa nacional ou estrangeira e CNPJ vazio
    empresa.estrangeira = !!input.estrangeira;

    const resultCNPJ = validateCNPJ(input.cnpj + "");
    if (
      (resultCNPJ.isOk() && !empresa.estrangeira) ||
      (resultCNPJ.isErr() && empresa.estrangeira)
    )
      empresa.cnpj = resultCNPJ.isOk() ? resultCNPJ.value : undefined;
    else if (resultCNPJ.isErr()) errors.push(...resultCNPJ.value);
    else errors.push("CNPJ válido, mas empresa foi apontada como estrangeira");

    // Empresa estrangeira precisa ter um idEstrangeira (para podermos identificá-la, dado que não há CNPJ)
    if (empresa.estrangeira && isNaN(Number(input.idEstrangeira)))
      errors.push("Empresa estrangeira precisa ter um idEstrangeira");
    else if (empresa.estrangeira)
      empresa.idEstrangeira = Number(input.idEstrangeira);

    // Razão social e nome fantasia não vazios
    const resultRazaoSocial = validateNome(input.razaoSocial + "");
    if (resultRazaoSocial.isOk()) empresa.razaoSocial = resultRazaoSocial.value;
    else errors.push(...resultRazaoSocial.value);

    const resultNomeFantasia = validateNome(input.nomeFantasia + "");
    if (resultNomeFantasia.isOk())
      empresa.nomeFantasia = resultNomeFantasia.value;
    else errors.push(...resultNomeFantasia.value);

    // Ano de fundação válido
    if (
      input.anoDeFundacao < 0 ||
      input.anoDeFundacao > new Date().getFullYear() ||
      isNaN(input.anoDeFundacao)
    )
      errors.push("Ano de fundação inválido");
    else empresa.anoDeFundacao = Number(input.anoDeFundacao);
    if (input.anoDeFundacao <= 1900) warns.push("Ano de fundação muito antigo");

    // CNAE válido ou empresa estrangeira
    const resultCNAE = validateCNAE(input.cnae + "");
    if (
      (resultCNAE.isOk() && !empresa.estrangeira) ||
      (resultCNAE.isErr() && empresa.estrangeira)
    )
      empresa.cnae = resultCNAE.isOk() ? resultCNAE.value : undefined;
    else if (resultCNAE.isErr() && !empresa.estrangeira)
      errors.push(...resultCNAE.value);

    // Situação na receita válida ou empresa estrangeira
    const resultSituacaoReceita = validateSituacaoReceita(
      input.situacaoReceita + ""
    );
    if (resultSituacaoReceita.isErr() && !empresa.estrangeira)
      errors.push(...resultSituacaoReceita.value);
    else if (resultSituacaoReceita.isOk() && !empresa.estrangeira)
      empresa.situacaoReceita = resultSituacaoReceita.value;
    else if (resultSituacaoReceita.isOk() && empresa.estrangeira)
      errors.push("Empresa estrangeira não pode ter situação na receita");

    if (errors.length > 0) return Result.err({ errors, warns });
    else return Result.ok({ empresa, errors, warns });
  }
}
