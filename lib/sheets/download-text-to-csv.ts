const downloadLinkClassIdentifier = `download-link-${new Date().getTime()}`;
export const downloadTextAsCSVFile = (
  unparsed: string,
  filename = "file.csv"
) => {
  const universalBOM = "\uFEFF";
  const blob = new Blob([universalBOM + unparsed], {
    type: "text/csv",
    endings: "native",
  });
  const href = window.URL.createObjectURL(blob);

  document
    .querySelectorAll(`.${downloadLinkClassIdentifier}`)
    .forEach((el) => el.remove());

  const link = document.createElement("a");
  link.className = downloadLinkClassIdentifier;
  link.setAttribute("href", href);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
