import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClimb as createClimbApi } from "../../services/apiClimbs";
import toast from "react-hot-toast";

export function useCreateClimb() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createClimb } = useMutation({
    mutationFn: createClimbApi,
    onSuccess: () => {
      toast.success("New Climb successfully created");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createClimb };
}
