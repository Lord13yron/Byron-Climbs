import { useClimb } from "./useClimb";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import styled from "styled-components";
import { HiArrowRight, HiOutlineStar, HiStar } from "react-icons/hi2";
import { useFavorites } from "./useFavorites";
import { useAddToFavorites } from "./useAddToFavorites";
import { useRemoveFavorite } from "./useRemoveFavorite";
import { useSends } from "./useSends";
import { useAddToSends } from "./useAddToSends";
import { useRemoveSend } from "./useRemoveSend";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import ImageGallery from "../../ui/ImageGallery";
import ClimbNotes from "./ClimbNotes";
import { useUser } from "../../contexts/UserContext";
import { Helmet } from "react-helmet-async";

const ClimbDetailBox = styled.div`
  background-color: var(--color-nature-100);
  margin: 4rem 2rem 1rem;
  width: 80%;
  opacity: 85%;
  border-radius: var(--border-radius-md);
  padding: 1rem 1rem;
  text-align: center;

  @media (max-width: 820px) {
    width: 90%;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const ClimbTitle = styled.h1`
  color: var(--color-nature-700);
  margin-bottom: 0.5rem;
`;

const ClimbGrade = styled.button`
  background-color: var(--color-nature-300);
  border-radius: var(--border-radius-md);
  font-size: 20px;
  padding: 0.4rem;
  margin-left: 0.2rem;
`;

const ClimbButton = styled.button`
  background-color: var(--color-nature-600);
  border-radius: var(--border-radius-md);
  padding-top: 0.3rem;
  padding-right: 0.2rem;
  padding-left: 0.2rem;
  font-size: 20px;
  color: gold;
  margin-bottom: 0.3rem;
  margin-right: 0.3rem;
  margin-left: 0.2rem;
`;

const Span = styled.span`
  margin-right: 0.5rem;
  font-size: 25px;
  color: var(--color-nature-600);
  background-color: var(--color-nature-100);

  &:hover {
    cursor: pointer;
  }
`;

function Climb() {
  const { user } = useUser();
  const { isLoading, climb } = useClimb(user.id);
  const { isLoading: isLoadingFavs, favorites } = useFavorites(user.id);
  const { isLoading: isAdding, addToFavorites } = useAddToFavorites();
  const { isLoading: isRemoving, removeFavorite } = useRemoveFavorite();
  const { isLoading: isLoadingSends, sends } = useSends(user.id);
  const { isLoading: isAddingSend, addToSends } = useAddToSends();
  const { isLoading: isRemovingSend, removeSend } = useRemoveSend();

  if (isLoading || isLoadingFavs || isLoadingSends) return <Spinner />;

  if (!climb) return <Empty resourceName="Problem" />;

  const isSend = sends?.some((send) => send.id === climb.id);
  const isFavorite = favorites?.some((fav) => fav.id === climb.id);

  return (
    <>
      <Helmet>
        <title>{`${climb.name} - V${climb.grade}`}</title>
      </Helmet>
      <ClimbDetailBox>
        <ClimbTitle>
          {isSend ? (
            <Span>
              <GrCheckboxSelected
                disabled={isRemovingSend}
                onClick={() =>
                  removeSend({ climbId: climb.id, userId: user.id })
                }
              />
            </Span>
          ) : (
            <Span>
              <GrCheckbox
                disabled={isAddingSend}
                onClick={() =>
                  addToSends({ climbId: climb.id, userId: user.id })
                }
              />
            </Span>
          )}

          {climb.name}

          <ClimbGrade>V{climb.grade}</ClimbGrade>

          {isFavorite ? (
            <ClimbButton
              disabled={isRemoving}
              onClick={() =>
                removeFavorite({ climbId: climb.id, userId: user.id })
              }
            >
              <HiStar />
            </ClimbButton>
          ) : (
            <ClimbButton
              disabled={isAdding}
              onClick={() =>
                addToFavorites({ climbId: climb.id, userId: user.id })
              }
            >
              <HiOutlineStar />
            </ClimbButton>
          )}
        </ClimbTitle>
        <p>
          {climb.city} <HiArrowRight /> {climb.area} <HiArrowRight />{" "}
          {climb.subArea}
        </p>
        <ClimbNotes notes={climb.notes} />
      </ClimbDetailBox>
      <ImageGallery medias={climb.images} type="climb" />
      <ImageGallery medias={climb.videos} type="climb" mediaType="video" />
    </>
  );
}

export default Climb;
