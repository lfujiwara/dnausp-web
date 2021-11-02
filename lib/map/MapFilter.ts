export type MapFilter = {
  incubated: boolean;
  graduated: boolean;
  nonIncubated: boolean;
  active: boolean;
};

function filterByIncubationStatus(
  incubationStatus: string,
  filters: MapFilter
): boolean {
  if (filters.incubated && incubationStatus === "Incubada") return true;
  if (filters.graduated && incubationStatus === "Graduada") return true;
  if (filters.nonIncubated && incubationStatus === "Direto para o mercado")
    return true;
  return false;
}

function filterByCompanyIsActive(status: string, filters: MapFilter): boolean {
  if (filters.active) return status === "Ativa";
  return status !== "Ativa";
}

export function filterCompany(company: any, filters: MapFilter): boolean {
  let incubationFilter = filterByIncubationStatus(
    company.estagioDeIncubacao,
    filters
  );
  let companyIsActiveFilter = filterByCompanyIsActive(company.status, filters);
  return incubationFilter && companyIsActiveFilter;
}
