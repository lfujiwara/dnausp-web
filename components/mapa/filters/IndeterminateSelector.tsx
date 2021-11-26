import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import React from "react";

export default function IndeterminateSelector(props: any) {
  const [companyFilters, setCompanyFilters] = React.useState(
    new Array(4).fill(true)
  );

  const allChecked = companyFilters.every(Boolean);
  const isIndeterminate = companyFilters.some(Boolean) && !allChecked;

  function handleStateUpdate(newState: boolean[]) {
    setCompanyFilters(newState);
    props.updateFn(newState);
  }

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => {
          handleStateUpdate(
            new Array(props.subgroup.length).fill(e.target.checked)
          );
        }}
      >
        {props.parent}
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        {props.subgroup.map((label: any, index: any) => {
          return (
            <Checkbox
              key={index}
              isChecked={companyFilters[index]}
              onChange={(e) => {
                let companyFiltersCopy = [...companyFilters];
                companyFiltersCopy[index] = e.target.checked;
                handleStateUpdate(companyFiltersCopy);
              }}
            >
              {label}
            </Checkbox>
          );
        })}
      </Stack>
    </>
  );
}
