import { Helmet } from "react-helmet-async";
import PageTitle from "../ui/PageTitle";

function Archive() {
  return (
    <>
      <Helmet>
        <title>Post Archive</title>
      </Helmet>
      <PageTitle title="Post Archive" />
    </>
  );
}

export default Archive;
