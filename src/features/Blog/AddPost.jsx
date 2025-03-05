import { useUser } from "../../contexts/UserContext";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreatePostForm from "./CreatePostForm";

function AddPost() {
  const { isSuperUser } = useUser();

  if (!isSuperUser) return null;

  return (
    <div>
      <Modal>
        <Modal.Open opens="post-form">
          <Button color="primary">Add new Post</Button>
        </Modal.Open>
        <Modal.Window name="post-form">
          <CreatePostForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPost;
