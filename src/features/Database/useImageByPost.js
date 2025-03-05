import { useQuery } from "@tanstack/react-query";
import { getImageByPost } from "../../services/apiImages";

export function useImageByPost(id) {
  const {
    isLoading,
    data: images = [],
    error,
  } = useQuery({
    queryKey: ["images", id],
    queryFn: () => getImageByPost(id),
    enabled: !!id,
  });
  return { isLoading, images, error };
}
