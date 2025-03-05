import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1rem;
  border-radius: var(--border-radius-sm);
  margin-left: 1rem;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-nature-50);
    background-color: var(--color-nature-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-nature-700);
    }
  }
`;

export default FileInput;
