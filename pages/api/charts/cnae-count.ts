import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import { CnaeCountQuery } from "../../../backend/queries/cnae-count-query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    const queryClass = new CnaeCountQuery(client);
    const data = await queryClass.execute({
      ...req.query,
    });
    res.status(200).json(data);
    await client.end();
  }
}
