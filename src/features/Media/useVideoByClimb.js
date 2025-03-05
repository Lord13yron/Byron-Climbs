import { useQuery } from "@tanstack/react-query";
import { getVideoByClimb } from "../../services/apiVideos";

export function useVideoByClimb(id) {
  const {
    isLoading,
    data: videos,
    error,
  } = useQuery({
    queryKey: ["videos", id],
    queryFn: () => getVideoByClimb(id),
  });
  return { isLoading, videos, error };
}
