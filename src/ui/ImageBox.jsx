import { useState } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  background-color: var(--color-nature-100);
  box-shadow: var(--shadow-md);
  width: 160px;
  min-width: 130px;
  height: 130px;
  padding: 0.5rem;
  position: relative;
  border: ${(props) =>
    props.$isActive ? "2px solid var(--color-nature-700)" : null};
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function ImageBox({ image, setSelected }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleSelect() {
    if (!isSelected) {
      setSelected((prev) => [
        ...prev,
        { id: image.id, url: image.url, name: image.name },
      ]);
      setIsSelected(true);
    } else {
      setSelected((prev) => prev.filter((id) => id !== image.id));
      setIsSelected(false);
    }
  }

  return (
    <ImageContainer
      onClick={handleSelect}
      $isActive={isSelected}
      key={image.id}
    >
      <StyledImg src={image.url} alt="" />
    </ImageContainer>
  );
}

export default ImageBox;
