import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const SearchInput = styled.input`
  margin-right: 0.5rem;
  height: 100%;
  width: 150px;
  border-radius: var(--border-radius-sm);
  font-size: 16px;
  padding: 0.5rem;
`;

function SearchBar({ searchBy, setSearchBy }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    setSearchBy(e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <SearchInput
        placeholder="Search"
        type="text"
        value={searchBy}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
