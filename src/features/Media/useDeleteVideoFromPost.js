import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteVideoByPost as deleteVideoByPostApi } from "../../services/apiVideos";

export function useDeleteVideoFromPost() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteVideoFromPost } = useMutation({
    mutationFn: deleteVideoByPostApi,
    onSuccess: () => {
      toast.success("Video successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteVideoFromPost };
}
