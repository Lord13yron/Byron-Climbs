import { useQuery } from "@tanstack/react-query";
import { getVideoByPost } from "../../services/apiVideos";

export function useVideoByPost(id) {
  const {
    isLoading,
    data: videos = [],
    error,
  } = useQuery({
    queryKey: ["videos", id],
    queryFn: () => getVideoByPost(id),
    enabled: !!id,
  });
  return { isLoading, videos, error };
}
