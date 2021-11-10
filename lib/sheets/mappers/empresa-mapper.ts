import { makeReport, ReportedValue } from "@common/report";
import { Result, TResult } from "@common/result";
import { IEmpresa } from "@domain/entities/empresa";
import { EmpresaFactory } from "@domain/factories/empresa.factory";
import { DefaultWorksheet } from "@sheets/defaults/default-worksheet";
import { empresaParser } from "@sheets/parsers/empresa-parser";

export type IEmpresaMapper = (
  input: DefaultWorksheet
) => TResult<ReportedValue<IEmpresa>, ReportedValue<DefaultWorksheet>>;

export const empresaMapper: IEmpresaMapper = (input) => {
  const report = makeReport();

  let empresa = empresaParser(input);

  const result = EmpresaFactory.create(empresa);

  if (result.isOk()) empresa = result.value.empresa;

  report.errors.push(...result.value.errors);
  report.warns.push(...result.value.warns);

  if (report.errors.length > 0) return Result.err({ ...report, value: input });
  else
    return Result.ok({
      ...report,
      value: empresa,
    });
};
