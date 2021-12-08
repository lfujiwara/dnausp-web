import { ChangeEvent } from "react";
import { CNAEClassifier, CNAEClassifiers } from "./cnae-classifiers";
import { Select } from "@chakra-ui/select";

export function SelectCNAEClassifier(props: {
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
  groupMethod: {
    name: string;
    classifier: CNAEClassifier;
    labels: { [p: string]: string | undefined };
  };
}) {
  return (
    <Select onChange={props.onChange} value={props.groupMethod.name} w="full">
      {CNAEClassifiers.map((method) => (
        <option key={method.name} value={method.name}>
          {method.name}
        </option>
      ))}
    </Select>
  );
}