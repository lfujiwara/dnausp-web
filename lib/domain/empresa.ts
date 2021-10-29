import { IEndereco } from "./endereco";
import { validateCNPJ } from "./validation/cnpj";

export interface IEmpresaData {
  id: number;
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

export class Empresa implements IEmpresaData {
  id: number;
  cnpj?: string;
  estrangeira: boolean;
  nomeFantasia: string;
  razaoSocial: string;
  anoDeFundacao: number;
  cnae?: string;
  tipoSocietario?: string;
  situacaoReceita?: string;
  endereco?: IEndereco;

  constructor(data: IEmpresaData) {
    this.id = data.id;
    this.cnpj = data.cnpj;
    this.estrangeira = data.estrangeira;
    this.nomeFantasia = data.nomeFantasia;
    this.razaoSocial = data.razaoSocial;
    this.anoDeFundacao = data.anoDeFundacao;
    this.cnae = data.cnae;
    this.tipoSocietario = data.tipoSocietario;
    this.situacaoReceita = data.situacaoReceita;
    this.endereco = data.endereco;
  }

  static validateCNPJ = validateCNPJ;
}
