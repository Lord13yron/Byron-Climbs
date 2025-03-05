import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addToFavorites as addToFavoritesApi } from "../../services/apiFavorites";

export function useAddToFavorites() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addToFavorites } = useMutation({
    mutationFn: ({ climbId, userId }) => addToFavoritesApi(climbId, userId),
    onSuccess: () => {
      toast.success("Climb successfully added to Favorites");
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding, addToFavorites };
}
