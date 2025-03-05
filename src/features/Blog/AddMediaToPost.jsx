import { useState } from "react";
import Button from "../../ui/Button";
import { useAddImageToPost } from "./useAddImageToPost";
import { useAddVideoToPost } from "../Media/useAddVideoToPost";
import Spinner from "../../ui/Spinner";
import { useUser } from "../../contexts/UserContext";
import Input from "../../ui/Input";

function AddMediaToPost({ postId, type }) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [key, setKey] = useState(0);
  const { isSuperUser, isLoading } = useUser();

  const { isAdding, addImageToPost } = useAddImageToPost();
  const { isAdding: isAddingVideo, addVideoToPost } = useAddVideoToPost();

  function getImage(e) {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  }

  function addImage() {
    addImageToPost({ postId: postId, image: image });

    setKey((prev) => prev + 1);
  }

  function handleAddVideo() {
    addVideoToPost({ postId: postId, url: url });
    setUrl("");
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
      {type === "image" && isSuperUser && (
        <>
          <Button disabled={isAdding} onClick={addImage}>
            Add Image
          </Button>
          <Input
            style={{
              backgroundColor: "var(--color-nature-100",
            }}
            key={key}
            onChange={getImage}
            type="file"
          />
        </>
      )}
      {type === "video" && isSuperUser && (
        <>
          <Button disabled={isAddingVideo} onClick={handleAddVideo}>
            Add Video
          </Button>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder=" YouTube video ID"
          />
        </>
      )}
    </div>
  );
}

export default AddMediaToPost;
