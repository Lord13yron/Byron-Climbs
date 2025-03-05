import styled from "styled-components";
import Modal from "../../ui/Modal";
import CreateClimbForm from "./CreateClimbForm";
import Menus from "../../ui/Menus";
import {
  HiMiniBarsArrowDown,
  HiOutlineStar,
  HiPencil,
  HiStar,
  HiTrash,
} from "react-icons/hi2";
import TableRow from "../../ui/TableRow";
import { Link } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteClimb } from "./useDeleteClimb";
import Spinner from "../../ui/Spinner";
import { useAddToFavorites } from "./useAddToFavorites";
import { useRemoveFavorite } from "./useRemoveFavorite";
import { useFavorites } from "./useFavorites";
import { useSends } from "./useSends";
import { useAddToSends } from "./useAddToSends";
import { useRemoveSend } from "./useRemoveSend";
import { useUser } from "../../contexts/UserContext";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

const P = styled.p`
  border: 1px solid var(--color-nature-300);
  font-size: 14px;
  padding: 0.3rem;
  color: var(--color-nature-700);
  @media (max-width: 450px) {
    font-size: 12px;
  }
`;

const Span = styled.span`
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

function ClimbingTableRow({ climb }) {
  const { isDeleting, deleteClimb } = useDeleteClimb();
  const { user, isSuperUser } = useUser();
  const { isLoading: isAddingFavs, addToFavorites } = useAddToFavorites();
  const { isDeleting: isDeletingFav, removeFavorite } = useRemoveFavorite();
  const { isLoading: isLoadingFavs, favorites } = useFavorites(user.id);
  const { isLoading: isLoadingSends, sends } = useSends(user.id);
  const { isLoading: isAddingSend, addToSends } = useAddToSends();
  const { isLoading: isDeletingSend, removeSend } = useRemoveSend();

  if (isLoadingFavs || isLoadingSends) return <Spinner />;

  const isSend = sends?.some((send) => send.id === climb.id);
  const isFavorite = favorites?.some((fav) => fav.id === climb.id);

  return (
    <TableRow>
      <P>
        {isSend ? (
          <Span>
            <GrCheckboxSelected
              disabled={isDeletingSend}
              onClick={() => removeSend({ climbId: climb.id, userId: user.id })}
            />
          </Span>
        ) : (
          <Span>
            <GrCheckbox
              disabled={isAddingSend}
              onClick={() => addToSends({ climbId: climb.id, userId: user.id })}
            />
          </Span>
        )}{" "}
        <Link
          to={`/database/${climb.id}`}
          style={{ textDecoration: "underline" }}
        >
          {climb.name}
        </Link>{" "}
      </P>
      <P>V{climb.grade}</P>
      <P>{climb.city}</P>
      <P>
        {climb.area} - {climb.subArea}
      </P>

      {isSuperUser ? (
        <Modal>
          <Menus.Menu style={{ border: "1px solid var(--color-nature-300)" }}>
            <Menus.Toggle id={climb.id} icon={<HiMiniBarsArrowDown />} />
            <Menus.List id={climb.id}>
              {user.userRole === "superuser" && (
                <>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}> Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}> Delete</Menus.Button>
                  </Modal.Open>
                </>
              )}

              {isFavorite ? (
                <Menus.Button
                  disabled={isDeletingFav}
                  onClick={() =>
                    removeFavorite({ climbId: climb.id, userId: user.id })
                  }
                  icon={<HiStar />}
                >
                  {" "}
                  Remove
                </Menus.Button>
              ) : (
                <Menus.Button
                  disabled={isAddingFavs}
                  onClick={() =>
                    addToFavorites({ climbId: climb.id, userId: user.id })
                  }
                  icon={<HiOutlineStar />}
                >
                  {" "}
                  Favorite
                </Menus.Button>
              )}
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={climb.name}
              onConfirm={() => deleteClimb(climb.id)}
              disabled={isDeleting}
            />
          </Modal.Window>

          <Modal.Window name="edit">
            <CreateClimbForm climbToUpdate={climb} />
          </Modal.Window>
        </Modal>
      ) : (
        <>
          {isFavorite ? (
            <P
              disabled={isDeletingFav}
              onClick={() =>
                removeFavorite({ climbId: climb.id, userId: user.id })
              }
            >
              <Span>
                <HiStar style={{ color: "orange" }} />
              </Span>
            </P>
          ) : (
            <P
              disabled={isAddingFavs}
              onClick={() =>
                addToFavorites({ climbId: climb.id, userId: user.id })
              }
            >
              <Span>
                <HiOutlineStar />
              </Span>
            </P>
          )}
        </>
      )}
    </TableRow>
  );
}

export default ClimbingTableRow;
