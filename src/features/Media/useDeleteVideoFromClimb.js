import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteVideoByClimb as deleteVideoByClimbApi } from "../../services/apiVideos";

export function useDeleteVideoFromClimb() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteVideoFromClimb } = useMutation({
    mutationFn: deleteVideoByClimbApi,
    onSuccess: () => {
      toast.success("Video successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteVideoFromClimb };
}
