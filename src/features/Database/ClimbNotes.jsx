import styled from "styled-components";
import { formatDate } from "../../utils/helpers";
import Empty from "../../ui/Empty";
import AddNoteForm from "./AddNoteForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Menus from "../../ui/Menus";
import { HiEllipsisHorizontal, HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteNote } from "./useDeleteNote";

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-nature-50);
  text-align: left;
  margin-top: 1rem;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
`;

const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid var(--color-nature-700);
  padding-bottom: 0.5rem;
`;

const Note = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-nature-500);
  padding-bottom: 0.5rem;
`;

function ClimbNotes({ notes }) {
  const { isDeleting, deleteNote } = useDeleteNote();

  return (
    <NotesContainer>
      <NotesHeader>
        <h2>Notes</h2>
        <Modal>
          <Modal.Open opens="edit-note">
            <Button color="primary">Add Note</Button>
          </Modal.Open>
          <Modal.Window name="edit-note">
            <AddNoteForm />
          </Modal.Window>
        </Modal>
      </NotesHeader>
      {notes.length === 0 && <Empty resourceName="notes" />}
      <Menus>
        {notes.map((note) => (
          <Note key={note.id}>
            <p>
              <em>{formatDate(note.created_at)}</em>- {note.note}
            </p>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={note.id} icon={<HiEllipsisHorizontal />} />
                <Menus.List id={note.id}>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}> Edit</Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}> Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>
              <Modal.Window name="edit">
                <AddNoteForm noteToUpdate={note} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  disabled={isDeleting}
                  onConfirm={() => deleteNote(note.id)}
                  resourceName="this Note"
                />
              </Modal.Window>
            </Modal>
          </Note>
        ))}
      </Menus>
    </NotesContainer>
  );
}

export default ClimbNotes;
