import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNote as addNoteApi } from "../../services/apiNotes";

export function useAddNote() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addNote } = useMutation({
    mutationFn: ({ climbId, userId, note }) =>
      addNoteApi(climbId, userId, note),
    onSuccess: () => {
      toast.success("Note Added");
      queryClient.invalidateQueries({
        queryKey: ["climbs"],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Note could not be added");
    },
  });

  return { isAdding, addNote };
}
