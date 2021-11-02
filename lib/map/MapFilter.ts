export type MapFilter = {
  incubated: boolean;
  graduated: boolean;
  neverIncubated: boolean;
  active: boolean;
};

export function filterCompany(company: any, filters: MapFilter): boolean {
  if (filters.incubated && company.estagioDeIncubacao === "Incubada")
    return true;
  if (filters.graduated && company.estagioDeIncubacao === "Graduada")
    return true;
  if (
    filters.neverIncubated &&
    company.estagioDeIncubacao == "Direto para o mercado"
  )
    return true;
  if (filters.active && company.ativa) return true;
  return false;
}
