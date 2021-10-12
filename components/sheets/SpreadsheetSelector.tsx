import { TSpreadsheetWorksheetSelector } from "../../hooks/useSpreadsheetWorksheetSelector";
import { useRef } from "react";

export const SpreadsheetWorksheetSelector = ({
  isError,
  isLoaded,
  isLoading,
  loadSpreadsheetMetadata,
  spreadsheetId,
  spreadsheetMetadata,
  setSelectedWorksheet,
}: TSpreadsheetWorksheetSelector) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div>
        <div>
          Digite o ID da planilha e clique no botão para carregar os dados.
        </div>
        <input ref={ref} type="text" placeholder="ID da planilha" />
        <button
          onClick={() => loadSpreadsheetMetadata(ref.current?.value || "")}
        >
          {isLoading ? "Carregando..." : "Carregar"}
        </button>
      </div>
      <div>
        {isLoading && <div>Carregando...</div>}
        {isError && <div>Erro ao carregar</div>}
        {isLoaded && (
          <div>
            <div>ID: {spreadsheetId}</div>
            <div>{spreadsheetMetadata?.title}</div>
            <select onChange={(evt) => setSelectedWorksheet(evt.target.value)}>
              {spreadsheetMetadata?.worksheets.map((worksheet) => (
                <option key={worksheet} value={worksheet}>
                  {worksheet}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
