import styled from "styled-components";
import ImageContainer from "./ImageContainer";
import AddImage from "./AddImage";
import Spinner from "./Spinner";
import Empty from "./Empty";
import AddVideo from "../features/Media/AddVideo";
import { useUser } from "../contexts/UserContext";

const ImageGalleryDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: var(--color-nature-300);
  width: 100%;
  padding: 0.5rem;
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
  justify-content: center;
  gap: 1rem;
`;

const GalleryHeader = styled.div`
  background-color: var(--color-nature-300);
  border-top-left-radius: var(--border-radius-lg);
  border-top-right-radius: var(--border-radius-lg);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  padding-top: 1rem;
`;

function ImageGallery({ medias, type, mediaType = "image" }) {
  const { isLoading, isSuperUser } = useUser();
  if (isLoading) return <Spinner />;

  return (
    <>
      <GalleryHeader>
        {!medias?.length && <Empty resourceName={`${mediaType}'s`} />}
        {isSuperUser && type === "climb" && mediaType === "image" && (
          <AddImage />
        )}
        {isSuperUser && type === "climb" && mediaType === "video" && (
          <AddVideo />
        )}
      </GalleryHeader>
      <ImageGalleryDiv>
        {medias?.map((media) => (
          <ImageContainer
            key={media.id}
            media={media}
            type={type}
            mediaType={mediaType}
          />
        ))}
      </ImageGalleryDiv>
    </>
  );
}

export default ImageGallery;
