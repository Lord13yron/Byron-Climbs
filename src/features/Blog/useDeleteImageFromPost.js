import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteImageByPost as deleteImageByPostApi } from "../../services/apiImages";

export function useDeleteImageFromPost() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteImageFromPost } = useMutation({
    mutationFn: deleteImageByPostApi,
    onSuccess: () => {
      toast.success("Image successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteImageFromPost };
}
