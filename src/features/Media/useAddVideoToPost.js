import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addVideoToPost as addVideoToPostApi } from "../../services/apiVideos";

export function useAddVideoToPost() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addVideoToPost } = useMutation({
    mutationFn: ({ postId, url }) => addVideoToPostApi(postId, url),
    onSuccess: () => {
      toast.success("Video successfully added to Post");
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Video could not be loaded");
    },
  });

  return { isAdding, addVideoToPost };
}
