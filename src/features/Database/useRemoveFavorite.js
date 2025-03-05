import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavorite as removeFavoriteApi } from "../../services/apiFavorites";
import toast from "react-hot-toast";

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: removeFavorite } = useMutation({
    mutationFn: ({ climbId, userId }) => removeFavoriteApi(climbId, userId),
    onSuccess: () => {
      toast.success("Favorite successfully removed");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, removeFavorite };
}
