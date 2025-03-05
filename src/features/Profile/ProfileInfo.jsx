import styled from "styled-components";
import { useUser } from "../../contexts/UserContext";
import { formatDate } from "../../utils/helpers";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-height: 450px;
  background-color: var(--color-nature-100);
  color: var(--color-nature-600);
  padding: 1rem;
  border-radius: var(--border-radius-md);
`;

const ListTitle = styled.h2`
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-nature-300);
  text-align: center;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--color-nature-0);
  border: 1px solid var(--color-nature-300);
  padding: 0.5rem;
`;

function ProfileInfo() {
  const { user } = useUser();

  return (
    <ListContainer>
      <ListTitle>Profile</ListTitle>
      <ListItem>Member since: {formatDate(user.confirmed_at)}</ListItem>
      <ListItem>Email: {user.email}</ListItem>
      <ListItem>Name: {user.user_metadata.name}</ListItem>
    </ListContainer>
  );
}

export default ProfileInfo;
