import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addVideoToClimb as addVideoToClimbApi } from "../../services/apiVideos";

export function useAddVideoToClimb() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addVideoToClimb } = useMutation({
    mutationFn: ({ climbId, url }) => addVideoToClimbApi(climbId, url),
    onSuccess: () => {
      toast.success("Video successfully added to Climb");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Video could not be loaded");
    },
  });

  return { isAdding, addVideoToClimb };
}
