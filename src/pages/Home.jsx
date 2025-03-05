import AddPost from "../features/Blog/AddPost";
import Blog from "../features/Blog/Blog";
import PageTitle from "../ui/PageTitle";

function Home() {
  return (
    <>
      <PageTitle
        title="Welcome to my Climbing Blog"
        subtitle={"Check below for recent updates"}
      />

      <AddPost />
      <Blog />
    </>
  );
}

export default Home;
