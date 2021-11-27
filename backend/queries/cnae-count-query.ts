import { Client } from "pg";

export interface CnaeCountQueryParams {
  "ano-de-fundacao-min"?: number;
  "ano-de-fundacao-max"?: number;
}

export interface ICnaeCountQuery {
  execute(
    params: CnaeCountQueryParams
  ): Promise<{ cnae: string; count: number }[]>;
}

export class CnaeCountQuery implements ICnaeCountQuery {
  constructor(private readonly pg: Client) {}

  async execute(
    params: CnaeCountQueryParams
  ): Promise<{ cnae: string; count: number }[]> {
    const {
      "ano-de-fundacao-min": anoDeFundacaoMin,
      "ano-de-fundacao-max": anoDeFundacaoMax,
    } = params;

    let whereClauses: string[] = ["cnae IS NOT NULL"];
    const args: any[] = [];

    if (anoDeFundacaoMin && !isNaN(anoDeFundacaoMin)) {
      args.push(anoDeFundacaoMin);
      whereClauses.push(`"anoDeFundacao" >= $${args.length}`);
    }
    if (anoDeFundacaoMax && !isNaN(anoDeFundacaoMax)) {
      args.push(anoDeFundacaoMax);
      whereClauses.push(`"anoDeFundacao" <= $${args.length}`);
    }

    const whereClausesStr =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const query = `
      SELECT
        cnae,
        COUNT(*)
      FROM
        "Empresa"
      ${whereClausesStr}
      GROUP BY
        cnae
      ORDER BY
        cnae
    `;

    console.log(query);

    const res = await this.pg.query(query, args);
    return res.rows;
  }
}
