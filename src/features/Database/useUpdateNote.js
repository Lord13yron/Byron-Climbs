import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateNote as updateNoteApi } from "../../services/apiNotes";

export function useUpdateNote() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateNote } = useMutation({
    mutationFn: ({ id, newNote }) => updateNoteApi(id, newNote),
    onSuccess: () => {
      toast.success("Note successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateNote };
}
