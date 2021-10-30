import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import React from "react";

export default function IndeterminateSelector({ parent, children }) {
  const [companyFilters, setCompanyFilters] = React.useState(
    new Array(4).fill(true)
  );

  const allChecked = companyFilters.every(Boolean);
  const isIndeterminate = companyFilters.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => {
          setCompanyFilters(new Array(children.length).fill(e.target.checked));
        }}
      >
        {parent}
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        {children.map((label: any, index: any) => {
          return (
            <Checkbox
              key={index}
              isChecked={companyFilters[index]}
              onChange={(e) => {
                let companyFiltersCopy = [...companyFilters];
                companyFiltersCopy[index] = e.target.checked;
                setCompanyFilters(companyFiltersCopy);
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
