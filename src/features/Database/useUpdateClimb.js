import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateClimb as updateClimbApi } from "../../services/apiClimbs";

export function useUpdateClimb() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateClimb } = useMutation({
    mutationFn: ({ id, newClimb }) => updateClimbApi(id, newClimb),
    onSuccess: () => {
      toast.success("Climb successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateClimb };
}
