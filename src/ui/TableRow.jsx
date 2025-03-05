import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.6fr 0.75fr 2fr 0.4fr;
  padding: 0rem 0.5rem;
  background-color: var(--color-nature-0);

  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > *:hover {
    overflow: visible;
    white-space: normal;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 450px) {
    padding: 0;
  }
`;

export default TableRow;
