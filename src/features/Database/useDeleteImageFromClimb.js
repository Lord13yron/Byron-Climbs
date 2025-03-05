import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteImageByClimb as deleteImageByClimbApi } from "../../services/apiImages";

export function useDeleteImageFromClimb() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteImageFromClimb } = useMutation({
    mutationFn: deleteImageByClimbApi,
    onSuccess: () => {
      toast.success("Image successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteImageFromClimb };
}
