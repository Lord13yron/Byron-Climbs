import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addToSends as addToSendsApi } from "../../services/apiSends";

export function useAddToSends() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addToSends } = useMutation({
    mutationFn: ({ climbId, userId }) => addToSendsApi(climbId, userId),
    onSuccess: () => {
      toast.success("Climb successfully added to Sends");
      queryClient.invalidateQueries({
        queryKey: ["sends"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding, addToSends };
}
