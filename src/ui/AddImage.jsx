import { useState } from "react";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { useAddImageToClimb } from "../features/Database/useAddImageToClimb";

function AddImage() {
  const [image, setImage] = useState(null);
  const { climbId } = useParams();
  const { isAdding, addImageToClimb } = useAddImageToClimb();

  function getImage(e) {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  }

  function addImage() {
    addImageToClimb({ climbId: climbId, image: image });
  }

  return (
    <div>
      <Button disabled={isAdding} onClick={addImage}>
        Add Image
      </Button>
      <input onChange={getImage} type="file" />
    </div>
  );
}

export default AddImage;
