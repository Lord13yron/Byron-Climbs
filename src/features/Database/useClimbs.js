import { useQuery } from "@tanstack/react-query";
import { getClimbs } from "../../services/apiClimbs";

export function useClimbs() {
  const {
    isLoading,
    data: climbs,
    error,
  } = useQuery({
    queryKey: ["climbs"],
    queryFn: getClimbs,
  });
  return { isLoading, climbs, error };
}
