import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addImagesToPost as addImagesToPostApi } from "../../services/apiImages";

export function useAddImagesToPost() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addImagesToPost } = useMutation({
    mutationFn: ({ postId, images }) => addImagesToPostApi(postId, images),
    onSuccess: () => {
      toast.success("Images successfully added to Post");
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Images could not be added");
    },
  });

  return { isAdding, addImagesToPost };
}
