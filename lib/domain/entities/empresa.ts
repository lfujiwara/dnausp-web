import { IEndereco } from "./endereco";

export interface IEmpresa {
  cnpj?: string;
  estrangeira: boolean;
  nomeFantasia: string;
  razaoSocial: string;
  anoDeFundacao: number;
  cnae?: string;
  tipoSocietario?: string;
  situacaoReceita?: string;
  endereco?: IEndereco;
}
