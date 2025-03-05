import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormTitle from "../../ui/FormTitle";
import Textarea from "../../ui/Textarea";
import { useAddNote } from "./useAddNote";
import { useClimb } from "./useClimb";
import Spinner from "../../ui/Spinner";
import { useUpdateNote } from "./useUpdateNote";
import { useUser } from "../../contexts/UserContext";

function AddNoteForm({ noteToUpdate = {}, onCloseModal }) {
  const { user } = useUser();
  const { isLoading, climb } = useClimb(user.id);
  const { isAdding, addNote } = useAddNote();
  const { isUpdating, updateNote } = useUpdateNote();

  const { id: editId, note } = noteToUpdate;
  const isEditSession = Boolean(editId);

  const [newNote, setNewNote] = useState(isEditSession ? note : "");

  function handleAddNote(e) {
    e.preventDefault();
    if (isEditSession) {
      updateNote({ id: editId, newNote: newNote });
      onCloseModal?.();
    } else {
      addNote({ climbId: climb.id, userId: user.id, note: newNote });
      onCloseModal?.();
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={(e) => handleAddNote(e)}>
      <FormTitle>{isEditSession ? "Edit Note" : "Add New Note"}</FormTitle>

      <Textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        rows="5"
        cols="40"
        type="textArea"
        id="name"
      />

      <Button disabled={isAdding || isUpdating}>
        {isEditSession ? "Edit Note" : "Add Note"}
      </Button>
    </Form>
  );
}

export default AddNoteForm;
