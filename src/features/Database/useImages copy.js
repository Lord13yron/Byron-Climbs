import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../services/apiImages";

export function useImages() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  return { isLoading, data, error };
}
