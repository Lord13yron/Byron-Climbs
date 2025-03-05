import { Link } from "react-router-dom";
import Button from "../ui/Button";
import PageTitle from "../ui/PageTitle";
import { Helmet } from "react-helmet-async";

function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <PageTitle title="This page could not be found.." />
      <Button color="primary">
        <Link to="/">Back to Homepage</Link>
      </Button>
    </>
  );
}

export default PageNotFound;
