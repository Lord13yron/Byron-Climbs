import { useState } from "react";
import Button from "../../ui/Button";
import { useParams } from "react-router-dom";
import { useAddVideoToClimb } from "./useAddVideoToClimb";

function AddVideo() {
  const [url, setUrl] = useState("");
  const { climbId } = useParams();
  const { isAdding: isAddingToClimb, addVideoToClimb } = useAddVideoToClimb();

  function handleAddVideo() {
    addVideoToClimb({ climbId, url });
  }

  return (
    <div>
      <Button disabled={isAddingToClimb} onClick={handleAddVideo}>
        Add Video
      </Button>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="text"
        placeholder=" enter YouTube video ID"
      />
    </div>
  );
}

export default AddVideo;
