import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const FilterButton = styled.button`
  background-color: var(--color-nature-0);
  color: var(--color-nature-700);
  border-radius: var(--border-radius-sm);
  padding: 0.5rem;

  ${({ $active }) =>
    $active &&
    `
    background-color: var(--color-nature-700);
    color: var(--color-nature-0);
    
    `};
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filterField, value);
    newSearchParams.set("page", 1);
    setSearchParams(newSearchParams);
  }

  return (
    <div>
      {options.map((option) => (
        <FilterButton
          key={option.label}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
}

export default Filter;
