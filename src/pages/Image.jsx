import { useParams } from "react-router-dom";
import { useImageById } from "../features/Media/useImageById";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--color-nature-500);
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  width: 1080px;
  min-width: 720px;
  height: 720px;
  max-height: 95vw;
  object-fit: contain;

  @media (max-width: 1080px) {
    width: 800px;
    min-width: 720px;
    height: 600px;
  }

  @media (max-width: 800px) {
    width: 100%;
    min-width: 100%;
  }
`;

function Image() {
  const { imageId } = useParams();
  const { image, isLoading } = useImageById(imageId);

  if (isLoading) return <Spinner />;
  console.log(image[0]);
  const name = image[0].url.split("/").at(-1);
  console.log(name);

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <ImageContainer>
        <StyledImage src={image[0].url} alt="" />
      </ImageContainer>
    </>
  );
}

export default Image;
