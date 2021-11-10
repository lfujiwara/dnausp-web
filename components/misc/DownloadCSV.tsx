import { IconButton, IconButtonProps } from "@chakra-ui/button";
import { downloadTextAsCSVFile } from "@sheets/download-text-to-csv";
import { FC, JSXElementConstructor, ReactElement } from "react";
import { FaFileDownload } from "react-icons/fa";

export type DownloadCSVProps = Omit<IconButtonProps, "onClick"> & {
  csvData?: string;
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  "aria-label"?: string;
};

export const DownloadCSV: FC<DownloadCSVProps> = ({
  csvData,
  "aria-label": ariaLabel,
  ...props
}) => (
  <IconButton
    aria-label={ariaLabel || "Download CSV"}
    icon={<FaFileDownload />}
    onClick={(evt) => {
      evt.preventDefault();
      downloadTextAsCSVFile(csvData + "");
    }}
    {...props}
  ></IconButton>
);
