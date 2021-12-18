import { VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  CNAE,
  FilterEmpresa,
  IncubadoraUSP,
  Instituto,
  InstitutoNome,
  OrigemInvestimento,
  TipoVinculo,
} from "@dnausp/core";
import Select from "react-select";
import cnaeData from "@json-assets/cnae.json";
import { HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

enum TipoVinculoNome {
  "GRADUACAO" = "Aluno/Ex-aluno de graduação",
  "POS_GRADUACAO" = "Aluno/Ex-aluno de pós-graduação",
  "POS_DOUTORADO" = "Aluno/Ex-aluno de pós-doutorado",
  "DOCENTE" = "Docente",
  "PESQUISADOR" = "Pesquisador",
  "INCUBACAO" = "Sócio de empresa incubada",
}

enum OrigemInvestimentoNome {
  "PROPRIO" = "Próprio",
  "ANJO" = "Anjo",
  "CROWDFUNDING" = "Crowdfunding",
  "VC" = "Venture Capital",
  "PE" = "Private Equity",
  "PIPEFAPESP" = "PIPE-FAPESP",
  "BNDES_FINEP" = "BNDES FINEP",
  "OUTROS" = "Outros",
}

const cnaeOptions = [
  cnaeData.divisoes,
  cnaeData.grupos,
  cnaeData.classes,
  cnaeData.subclasses,
]
  .map((o) => Object.values(o))
  .flat()
  .map((o) => ({
    value: o.id,
    label: `${CNAE.format(o.id)} - ${o.descricao}`,
  }));

const institutoOptions = Object.keys(Instituto).map((i) => ({
  value: i,
  label: `${InstitutoNome[i]} - ${i}`,
}));

const tipoVinculoOptions = Object.keys(TipoVinculo).map((i) => ({
  value: i,
  label: TipoVinculoNome[i],
}));

const origemInvestimentoOptions = Object.keys(OrigemInvestimento).map((i) => ({
  value: i,
  label: OrigemInvestimentoNome[i],
}));

const incubadoraOptions = Object.keys(IncubadoraUSP).map((i) => ({
  value: i,
  label: `${IncubadoraUSP[i]}`,
}));

export const useFilterEmpresa = () => {
  const [state, setState] = useState<FilterEmpresa>({});
  const setInstituto = (instituto: string[]) => {
    setState({
      ...state,
      instituto,
    });
  };

  const setTipoVinculo = (tipoVinculo: string[]) => {
    setState({
      ...state,
      tipoVinculo,
    });
  };

  const setOrigemInvestimento = (origemInvestimento: string[]) => {
    setState({
      ...state,
      origemInvestimento,
    });
  };

  const setAtividadePrincipal = (atividadePrincipal: string[]) => {
    setState({
      ...state,
      atividadePrincipal,
    });
  };

  const setIncubadora = (incubadora: string[]) => {
    setState({
      ...state,
      incubadora,
    });
  };

  return {
    state,
    setInstituto,
    setTipoVinculo,
    setOrigemInvestimento,
    setAtividadePrincipal,
    setIncubadora,
  };
};

const toValue = (x) => x.value;
const undefinedIfNan = (x) => (isNaN(x) ? undefined : x);

export const EmpresaFilter = ({
  onApply,
  isLoading,
}: {
  onApply: (filter: FilterEmpresa) => void;
  isLoading?: boolean;
}) => {
  const {
    state,
    setInstituto,
    setTipoVinculo,
    setOrigemInvestimento,
    setAtividadePrincipal,
    setIncubadora,
  } = useFilterEmpresa();

  const anoMinRef = useRef<HTMLInputElement>(null);
  const anoMaxRef = useRef<HTMLInputElement>(null);

  const apply = () => {
    const anoFundacaoMin = parseInt(anoMinRef.current?.value, 10);
    const anoFundacaoMax = parseInt(anoMaxRef.current?.value, 10);

    const payload = {
      ...state,
      anoFundacaoMin: undefinedIfNan(anoFundacaoMin),
      anoFundacaoMax: undefinedIfNan(anoFundacaoMax),
    } as FilterEmpresa;
    onApply(payload);
  };

  return (
    <VStack spacing="3" align="stretch">
      <Select
        placeholder="Instituto"
        isMulti
        options={institutoOptions}
        onChange={(e) => setInstituto(e.map(toValue))}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
      <Select
        placeholder="Tipo de vínculo"
        isMulti
        options={tipoVinculoOptions}
        onChange={(e) => setTipoVinculo(e.map(toValue))}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
      <Select
        placeholder="Origem do investimento"
        isMulti
        options={origemInvestimentoOptions}
        onChange={(e) => setOrigemInvestimento(e.map(toValue))}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
      <Select
        placeholder="Atividade principal (CNAE)"
        isMulti
        options={cnaeOptions}
        onChange={(e) => setAtividadePrincipal(e.map(toValue))}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
      <Select
        placeholder="Incubadora"
        isMulti
        options={incubadoraOptions}
        onChange={(e) => setIncubadora(e.map(toValue))}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
      <HStack spacing="2">
        <Input
          placeholder="Ano de fundação (Mínimo)"
          ref={anoMinRef}
          type="number"
          min="0"
          step="1"
          isDisabled={isLoading}
        />
        <Input
          placeholder="Ano de fundação (Máximo)"
          ref={anoMaxRef}
          type="number"
          min="0"
          step="1"
          isDisabled={isLoading}
        />
      </HStack>
      <Button isLoading={isLoading} onClick={apply}>
        Aplicar
      </Button>
    </VStack>
  );
};
