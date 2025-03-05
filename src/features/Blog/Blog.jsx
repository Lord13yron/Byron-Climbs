import React, { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import BlogPost from "./BlogPost";
import { usePosts } from "./usePosts";
import { useInView } from "react-intersection-observer";

function Blog() {
  const { isLoading, posts, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePosts();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <Spinner />;

  return (
    <>
      {posts?.pages?.map((pages, i) => (
        <React.Fragment key={i}>
          {pages?.map((post) => (
            <BlogPost post={post} key={post.id} />
          ))}
        </React.Fragment>
      ))}

      <div ref={ref} style={{ height: "50px" }}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </>
  );
}

export default Blog;
