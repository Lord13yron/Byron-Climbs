import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addImageToPost as addImageToPostApi } from "../../services/apiImages";

export function useAddImageToPost() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addImageToPost } = useMutation({
    mutationFn: ({ postId, image }) => addImageToPostApi(postId, image),
    onSuccess: () => {
      toast.success("Image successfully added to Post");
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Image could not be loaded");
    },
  });

  return { isAdding, addImageToPost };
}
