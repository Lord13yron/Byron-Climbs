import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost as updatePostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updatePost } = useMutation({
    mutationFn: ({ id, newPost }) => updatePostApi(id, newPost),
    onSuccess: () => {
      toast.success("Post successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updatePost };
}
