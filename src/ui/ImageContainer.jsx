import { HiOutlineXCircle } from "react-icons/hi2";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useDeleteImageFromClimb } from "../features/Database/useDeleteImageFromClimb";
import { useDeleteImageFromPost } from "../features/Blog/useDeleteImageFromPost";
import { useDeleteVideoFromClimb } from "../features/Media/useDeleteVideoFromClimb";
import { useDeleteVideoFromPost } from "../features/Media/useDeleteVideoFromPost";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: var(--color-nature-100);
  box-shadow: var(--shadow-md);
  width: 400px;
  min-width: 360px;
  height: 300px;
  padding: 0.5rem;
  position: relative;

  @media (max-width: 400px) {
    width: 100%;
    min-width: 100%;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -17px;
  right: -17px;
  border: none;
  background: none;
  font-size: 24px;
  color: darkred;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function ImageContainer({ media, type, mediaType = "image" }) {
  const { isLoading, isSuperUser } = useUser();
  const { isDeleting: isDeletingClimbImg, deleteImageFromClimb } =
    useDeleteImageFromClimb();
  const { isDeleting: isDeletingPostImg, deleteImageFromPost } =
    useDeleteImageFromPost();
  const { isDeleting: isDeletingClimbVid, deleteVideoFromClimb } =
    useDeleteVideoFromClimb();
  const { isDeleting: isDeletingPostVid, deleteVideoFromPost } =
    useDeleteVideoFromPost();

  if (isLoading) return <Spinner />;
  return (
    <Container>
      {isSuperUser && (
        <DeleteButton
          disabled={
            isDeletingClimbImg ||
            isDeletingPostImg ||
            isDeletingClimbVid ||
            isDeletingPostVid
          }
          onClick={() =>
            type === "climb" && mediaType === "image"
              ? deleteImageFromClimb(media)
              : type === "post" && mediaType === "image"
              ? deleteImageFromPost(media)
              : type === "climb" && mediaType === "video"
              ? deleteVideoFromClimb(media)
              : type === "post" && mediaType === "video"
              ? deleteVideoFromPost(media)
              : null
          }
        >
          <HiOutlineXCircle />
        </DeleteButton>
      )}
      {mediaType === "video" ? (
        <Video src={`https://youtube.com/embed/${media.url}`} allowFullScreen />
      ) : (
        <Link to={`/images/${media.id}`}>
          <Image src={media.url} alt="" />
        </Link>
      )}
    </Container>
  );
}

export default ImageContainer;
