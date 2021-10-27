import { AnoValidatorEntry } from "./ano.validator";
import { CNAEValidatorEntry } from "./cnae.validator";
import { CNPJValidatorEntry } from "./cnpj.validator";
import { SocioValidatorEntries } from "./socio.validator";

export const RowValidatorEntries = [
  CNPJValidatorEntry,
  CNAEValidatorEntry,
  AnoValidatorEntry,
  ...SocioValidatorEntries,
];
