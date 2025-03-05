import { useQuery } from "@tanstack/react-query";
import { getSends } from "../../services/apiSends";

export function useSends(id) {
  const {
    isLoading,
    data: sends,
    error,
  } = useQuery({
    queryKey: ["sends", id],
    queryFn: () => getSends(id),
    enabled: !!id,
  });
  return { isLoading, sends, error };
}
