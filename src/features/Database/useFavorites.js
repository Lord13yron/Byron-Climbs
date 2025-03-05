import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../services/apiFavorites";

export function useFavorites(id) {
  const {
    isLoading,
    data: favorites,
    error,
  } = useQuery({
    queryKey: ["favorites", id],
    queryFn: () => getFavorites(id),
    enabled: !!id,
  });
  return { isLoading, favorites, error };
}
