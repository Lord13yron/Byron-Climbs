import styled from "styled-components";
import ClimbingTableRow from "../features/Database/ClimbingTableRow";
import Menus from "./Menus";
import Button from "./Button";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const TableFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem;
  width: 430px;
  border: 1px solid var(--color-nature-0);
  background-color: var(--color-nature-50);
`;

function Pagination({ searchedClimbs, pageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const count = searchedClimbs.length;
  const numPages = Math.ceil(count / pageSize);
  const from = (page - 1) * pageSize;
  const to = Number(from) + Number(pageSize);

  const displayClimbs = searchedClimbs.slice(from, to);

  function handleFirstPage() {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", 1);
    setSearchParams(newSearchParams);
  }

  function handleLastPage() {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", numPages);
    setSearchParams(newSearchParams);
  }

  function handleNextPage() {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", page + 1);
    setSearchParams(newSearchParams);
  }

  function handlePreviousPage() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page - 1);
    setSearchParams(newSearchParams);
  }

  return (
    <>
      <Menus>
        {displayClimbs.map((climb) => (
          <ClimbingTableRow climb={climb} key={climb.id} />
        ))}
      </Menus>
      <TableFooter>
        <p>
          Showing {from + 1} to {to > count ? count : to} of {count} Entries
        </p>
        {count > pageSize && (
          <StyledPagination>
            <Button disabled={page === 1} onClick={handleFirstPage}>
              First Page
            </Button>
            <Button
              disabled={page === 1}
              onClick={handlePreviousPage}
              color="secondary"
            >
              <HiChevronDoubleLeft />
            </Button>

            <Button disabled={true}>{page}</Button>

            <Button
              disabled={page === numPages}
              color="secondary"
              onClick={handleNextPage}
            >
              <HiChevronDoubleRight />
            </Button>
            <Button disabled={page === numPages} onClick={handleLastPage}>
              Last Page
            </Button>
          </StyledPagination>
        )}
      </TableFooter>
    </>
  );
}

export default Pagination;
