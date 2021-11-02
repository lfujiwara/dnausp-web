import { Text } from "@chakra-ui/react";

function Info(props) {
  return (
    <Text>
      {props.label}: {props.value}
    </Text>
  );
}
export default function CompanyInfo(props: any) {
  return (
    <>
      <Info label="Área de atuação" value={props.info.grupo_cnae} />
      <Info
        label="Estágio de incubação"
        value={props.info.estagioDeIncubacao}
      />
      <Info label="Munícipio" value={props.info.municipio} />
      <Info label="Status" value={props.info.status} />
    </>
  );
}
