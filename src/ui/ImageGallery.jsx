import styled from "styled-components";
import ImageContainer from "./ImageContainer";
import AddImage from "./AddImage";
import Spinner from "./Spinner";
import Empty from "./Empty";
import AddVideo from "../features/Media/AddVideo";
import { useUser } from "../contexts/UserContext";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ImageGalleryDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: var(--color-nature-300);
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

function ImageGallery({
  medias,
  type,
  mediaType = "image",
  paginate,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}) {
  const { isLoading, isSuperUser } = useUser();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <GalleryHeader>
        <h2>{mediaType === "image" ? "Images" : "Videos"}</h2>
        {!medias?.pages && !medias?.length && (
          <Empty resourceName={`${mediaType}'s`} />
        )}
        {isSuperUser && type === "climb" && mediaType === "image" && (
          <AddImage />
        )}
        {isSuperUser && type === "climb" && mediaType === "video" && (
          <AddVideo />
        )}
      </GalleryHeader>

      {paginate === "true" ? (
        <ImageGalleryDiv>
          {medias?.pages?.map((pages, i) => (
            <React.Fragment key={i}>
              {pages?.map((media) => (
                <ImageContainer
                  key={media.id}
                  media={media}
                  type={type}
                  mediaType={mediaType}
                />
              ))}
            </React.Fragment>
          ))}
          <div ref={ref} style={{ height: "50px" }}>
            {isFetchingNextPage && <Spinner />}
          </div>
        </ImageGalleryDiv>
      ) : (
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
      )}
    </>
  );
}

export default ImageGallery;
