import styled from "styled-components";
import { formatDate } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDeletePost } from "./useDeletePost";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import CreatePostForm from "./CreatePostForm";
import { useImageByPost } from "../Database/useImageByPost";
import Spinner from "../../ui/Spinner";
import ImageGallery from "../../ui/ImageGallery";
import { useVideoByPost } from "../Media/useVideoByPost";
import AddMediaToPost from "./AddMediaToPost";
import { useUser } from "../../contexts/UserContext";
import AddImageFromDb from "../../ui/AddImageFromDb";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Post = styled.div`
  width: 75%;
  background-color: var(--color-nature-300);
  color: var(--color-nature-600);
  border-radius: var(--border-radius-md);
  text-align: center;
  opacity: 95%;
  margin-top: 2rem;
  padding: 1rem;
  @media (max-width: 820px) {
    width: 90%;
  }

  @media (max-width: 450px) {
    width: 100%;
  }
`;

const Hr = styled.hr`
  margin: 1rem;
  border-color: var(--color-nature-600);
  background-color: var(--color-nature-600);
`;

const Content = styled.p`
  margin-top: 0.5rem;
`;

function BlogPost({ post }) {
  const { isDeleting, deletePost } = useDeletePost();
  const { isSuperUser } = useUser();
  const { isLoading: isLoadingImages, images = [] } = useImageByPost(post.id);
  const { isLoading: isLoadingVideos, videos = [] } = useVideoByPost(post.id);

  const daysAgo = formatDate(post.created_at);

  if (isLoadingImages || isLoadingVideos) return <Spinner />;

  return (
    <>
      <Post>
        <h1>{post.title}</h1>
        <p>
          <em>Posted {daysAgo}</em>
        </p>
        <Content>{post.content}</Content>
        {isSuperUser && (
          <>
            <ButtonGroup>
              <Modal>
                <Modal.Open opens="post-form">
                  <Button color="primary">Edit Post</Button>
                </Modal.Open>
                <Modal.Window name="post-form">
                  <CreatePostForm postToUpdate={post} />
                </Modal.Window>
                <Modal.Open opens="confirm-delete">
                  <Button color="danger">Delete Post</Button>
                </Modal.Open>
                <Modal.Window name="confirm-delete">
                  <ConfirmDelete
                    resourceName={post.title}
                    disabed={isDeleting}
                    onConfirm={() => deletePost(post.id)}
                  />
                </Modal.Window>
              </Modal>
            </ButtonGroup>
            <Hr />
            <AddImageFromDb post={post} />
            <AddMediaToPost postId={post.id} type="image" />
          </>
        )}

        {images?.length !== 0 && <ImageGallery medias={images} type="post" />}
        <AddMediaToPost postId={post.id} type="video" />
        {videos?.length !== 0 && (
          <ImageGallery medias={videos} type="post" mediaType="video" />
        )}
      </Post>
    </>
  );
}

export default BlogPost;
