import FilterSelector from "./FilterSelector";

export default function FiltersContainer(props: any) {
  return (
    <div className="filters-panel">
      <FilterSelector updateFn={props.updateFn} />
    </div>
  );
}
