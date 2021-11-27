import { DownloadCSV, DownloadCSVProps } from "./DownloadCSV";
import { unparse } from "papaparse";

export const DownloadCSVFromObjectArray = ({
  arr,
  ...props
}: { arr: any[] } & DownloadCSVProps) => {
  return <DownloadCSV csvData={unparse(arr, { header: true })} {...props} />;
};
