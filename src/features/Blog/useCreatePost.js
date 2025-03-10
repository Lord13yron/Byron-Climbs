import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      toast.success("New Post successfully created");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPost };
}
