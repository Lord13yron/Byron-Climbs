import { useQuery } from "@tanstack/react-query";
import { getClimb } from "../../services/apiClimbs";
import { useParams } from "react-router-dom";

export function useClimb(userId) {
  const { climbId } = useParams();

  const {
    isLoading,
    data: climb,
    error,
  } = useQuery({
    queryKey: ["climbs", climbId, userId],
    queryFn: () => getClimb(climbId, userId),
    retry: false,
  });
  return { isLoading, climb, error };
}
