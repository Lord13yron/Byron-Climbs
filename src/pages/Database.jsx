import { Helmet } from "react-helmet-async";
import ProblemTable from "../features/Database/ClimbingTable";

function Database() {
  return (
    <>
      <Helmet>
        <title>Climbing Database</title>
      </Helmet>
      <ProblemTable />
    </>
  );
}

export default Database;
