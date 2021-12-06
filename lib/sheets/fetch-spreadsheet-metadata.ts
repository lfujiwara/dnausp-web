import {
  RawSpreadsheetMetadata,
  SpreadsheetMetadata,
} from "./spreadsheet-metadata";

import { FetchHeaders } from "@common/fetch-headers";
import { useQuery, UseQueryOptions } from "react-query";
import { useGAPIContext } from "@auth/gapi/GAPIAuthContext";
import axios from "axios";

export const fetchSpreadsheetMetadata = (
  spreadsheetId: string,
  token: string
): Promise<SpreadsheetMetadata> => {
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...FetchHeaders.useJson,
      },
    }
  )
    .then((response) => response.json())
    .then((data: RawSpreadsheetMetadata) => ({
      id: data.spreadsheetId,
      title: data.properties.title,
      worksheets: data.sheets.map((sheet) => sheet.properties.title),
    }));
};

export const useFetchSpreadsheetMetadata = (
  spreadsheetId: string,
  config:
    | Omit<
        UseQueryOptions<
          SpreadsheetMetadata,
          unknown,
          SpreadsheetMetadata,
          string[]
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) => {
  const { accessToken } = useGAPIContext();

  return useQuery(
    ["google-api-spreadsheet-metadata", spreadsheetId],
    () => {
      return axios
        .get<RawSpreadsheetMetadata>(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => response.data)
        .then(
          (data): SpreadsheetMetadata => ({
            id: data.spreadsheetId,
            title: data.properties.title,
            worksheets: data.sheets.map((sheet) => sheet.properties.title),
          })
        );
    },
    config
  );
};
