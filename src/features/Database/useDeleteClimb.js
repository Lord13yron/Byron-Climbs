import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteClimb as deleteClimbApi } from "../../services/apiClimbs";

export function useDeleteClimb() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteClimb } = useMutation({
    mutationFn: deleteClimbApi,
    onSuccess: () => {
      toast.success("Climb successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteClimb };
}
