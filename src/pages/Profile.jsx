import styled from "styled-components";
import { useUser } from "../contexts/UserContext";
import { useFavorites } from "../features/Database/useFavorites";
import { useSends } from "../features/Database/useSends";
import PageTitle from "../ui/PageTitle";
import Spinner from "../ui/Spinner";
import ProfileInfo from "../features/Profile/ProfileInfo";
import ProfileList from "../features/Profile/ProfileList";
import { useRemoveSend } from "../features/Database/useRemoveSend";
import { useRemoveFavorite } from "../features/Database/useRemoveFavorite";

const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  height: 100vh;
  justify-content: center;
  gap: 1rem;
`;

function Profile() {
  const { user } = useUser();
  const { isLoading: isLoadingFavs, favorites } = useFavorites(user?.id);
  const { isLoading: isLoadingSends, sends } = useSends(user?.id);
  const { isLoading: isRemovingSend, removeSend } = useRemoveSend();
  const { isLoading: isRemovingFav, removeFavorite } = useRemoveFavorite();

  const sortedSends = sends?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const sortedFavorites = favorites?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (isLoadingFavs || isLoadingSends) return <Spinner />;

  return (
    <>
      <PageTitle title={user.email} />
      <ProfileContainer>
        <ProfileInfo user={user} />
        <ProfileList
          items={sortedSends}
          title="My Sends"
          isLoading={isRemovingSend}
          deleteItem={removeSend}
        />
        <ProfileList
          items={sortedFavorites}
          title="My Favorites"
          isLoading={isRemovingFav}
          deleteItem={removeFavorite}
        />
      </ProfileContainer>
    </>
  );
}

export default Profile;
