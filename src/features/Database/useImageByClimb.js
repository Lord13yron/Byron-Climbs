import { useQuery } from "@tanstack/react-query";
import { getImageByClimb } from "../../services/apiImages";

export function useImageByClimb(id) {
  const {
    isLoading,
    data: images,
    error,
  } = useQuery({
    queryKey: ["images", id],
    queryFn: () => getImageByClimb(id),
  });
  return { isLoading, images, error };
}
