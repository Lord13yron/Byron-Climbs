import Button from "./Button";
import ImagesModal from "./ImagesModal";
import SelectImages from "./SelectImages";

function AddImageFromDb({ post }) {
  return (
    <div>
      <ImagesModal>
        <ImagesModal.Open opens="images">
          <Button>Add Image from DB</Button>
        </ImagesModal.Open>
        <ImagesModal.Window name="images">
          <SelectImages post={post} />
        </ImagesModal.Window>
      </ImagesModal>
    </div>
  );
}

export default AddImageFromDb;
