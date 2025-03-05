import { useImages } from "../features/Database/useImages";
import Spinner from "./Spinner";
import styled from "styled-components";
import ImageBox from "./ImageBox";
import { useState } from "react";
import Button from "./Button";
import { useAddImagesToPost } from "../features/Blog/useAddImagesToPost";

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

function SelectImages({ post, onCloseModal }) {
  const { isLoading, data: images } = useImages();
  const { isAdding, addImagesToPost } = useAddImagesToPost();
  const [selected, setSelected] = useState([]);

  if (isLoading) return <Spinner />;

  function handleAddImages() {
    addImagesToPost({ postId: post.id, images: selected });
    onCloseModal?.();
  }

  return (
    <>
      <ImagesContainer>
        {images.map((image) => (
          <ImageBox key={image.id} image={image} setSelected={setSelected} />
        ))}
      </ImagesContainer>
      <Button onClick={handleAddImages} disabled={isAdding}>
        Add Images
      </Button>
    </>
  );
}

export default SelectImages;
