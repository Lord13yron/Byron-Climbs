import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import { useEffect } from "react";

export function usePosts() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchInfiniteQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        initialPageParam: posts?.pages.length + 1, // Prefetch the next page
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          if (lastPage.length === 0) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      });
    }
  }, [posts, hasNextPage, queryClient]);

  return { isLoading, posts, fetchNextPage, hasNextPage, isFetchingNextPage };
}
