import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSend as removeSendApi } from "../../services/apiSends";
import toast from "react-hot-toast";

export function useRemoveSend() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: removeSend } = useMutation({
    mutationFn: ({ climbId, userId }) => removeSendApi(climbId, userId),
    onSuccess: () => {
      toast.success("Send successfully removed");
      queryClient.invalidateQueries({ queryKey: ["sends"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, removeSend };
}
