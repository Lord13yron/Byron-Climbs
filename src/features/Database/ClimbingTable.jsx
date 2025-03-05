import styled from "styled-components";
import { useClimbs } from "./useClimbs";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateClimbForm from "./CreateClimbForm";
import TableRow from "../../ui/TableRow";
import SearchBar from "../../ui/SearchBar";
import { useState } from "react";
import { getValuesAsString } from "../../utils/helpers";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { useFavorites } from "./useFavorites";
import Filter from "../../ui/Filter";
import { useSends } from "./useSends";
import { useUser } from "../../contexts/UserContext";
import { HiOutlineStar } from "react-icons/hi2";

const Table = styled.div`
  background-color: var(--color-nature-100);
  margin: 4rem 2rem;
  width: 80%;
  opacity: 85%;
  border-radius: var(--border-radius-md);
  padding: 1rem 0rem;

  @media (max-width: 820px) {
    width: 90%;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const P = styled.p`
  margin: 0.5rem 0rem;
  font-weight: bold;
  color: var(--color-nature-700);
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0rem 0.5rem 0.5rem;
`;

const Span = styled.span`
  margin: 0.5rem;
  color: var(--color-nature-700);
`;

const Select = styled.select`
  margin-bottom: 0.5rem;
`;

function ClimbingTable() {
  const [searchParams] = useSearchParams();
  const [searchBy, setSearchBy] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const { climbs, isLoading: isLoadingAll } = useClimbs();
  const { user } = useUser();
  const { favorites, isLoading: isLoadingFavs } = useFavorites(user.id);
  const { sends, isLoading: isLoadingSends } = useSends(user.id);
  const searchType = searchParams.get("climbs");

  let searchedClimbs = [];

  if (searchType === "favorites")
    searchedClimbs = favorites?.filter((climb) =>
      getValuesAsString(climb).toLowerCase().includes(searchBy.toLowerCase())
    );
  else if (searchType === "sends")
    searchedClimbs = sends?.filter((climb) =>
      getValuesAsString(climb).toLowerCase().includes(searchBy.toLowerCase())
    );
  else
    searchedClimbs = climbs?.filter((climb) =>
      getValuesAsString(climb).toLowerCase().includes(searchBy.toLowerCase())
    );

  if (isLoadingAll || isLoadingFavs || isLoadingSends) return <Spinner />;

  return (
    <Table>
      <TableHeader>
        <Modal>
          <Modal.Open opens="edit-climb">
            <Button color="primary">Add Climb</Button>
          </Modal.Open>
          <Modal.Window name="edit-climb">
            <CreateClimbForm />
          </Modal.Window>
        </Modal>
        <Filter
          filterField="climbs"
          options={[
            { value: "all", label: "All" },
            { value: "favorites", label: "Favorites" },
            { value: "sends", label: "Sends" },
          ]}
        />
        <SearchBar searchBy={searchBy} setSearchBy={setSearchBy} />
      </TableHeader>
      <Span>entries per page</Span>
      <Select onChange={(e) => setPageSize(e.target.value)} value={pageSize}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </Select>
      <TableRow>
        <P>Name</P>
        <P>Grade</P>
        <P>City</P>
        <P>Area</P>
        <P>
          <HiOutlineStar />
        </P>
      </TableRow>
      {searchedClimbs.length === 0 ? (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          No climbs found...
        </p>
      ) : (
        <Pagination searchedClimbs={searchedClimbs} pageSize={pageSize} />
      )}
    </Table>
  );
}

export default ClimbingTable;
