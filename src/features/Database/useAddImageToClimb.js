import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addImageToClimb as addImageToClimbApi } from "../../services/apiImages";

export function useAddImageToClimb() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addImageToClimb } = useMutation({
    mutationFn: ({ climbId, image }) => addImageToClimbApi(climbId, image),
    onSuccess: () => {
      toast.success("Image successfully added to Climb");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Image could not be loaded");
    },
  });

  return { isAdding, addImageToClimb };
}
