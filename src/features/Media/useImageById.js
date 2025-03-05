import { useQuery } from "@tanstack/react-query";
import { getImageById } from "../../services/apiImages";

export function useImageById(id) {
  const {
    isLoading,
    data: image,
    error,
  } = useQuery({
    queryKey: ["images", id],
    queryFn: () => getImageById(id),
    enabled: !!id,
  });
  return { isLoading, image, error };
}
