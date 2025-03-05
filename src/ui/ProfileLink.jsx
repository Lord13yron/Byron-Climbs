import styled from "styled-components";
import { useUser } from "../contexts/UserContext";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 82px;
  justify-content: center;
  align-items: center;
  background-color: var(--color-nature-400);
  padding: 0.5rem;
  gap: 0.25rem;
  border-radius: var(--border-radius-md);
  font-size: 0.75rem;
  color: var(--color-nature-0);
`;

const StyledProfileLink = styled.div`
  display: flex;
  background-color: var(--color-nature-100);
  width: 40px; /* Adjust the size as needed */
  height: 40px; /* Adjust the size as needed */
  border-radius: 50%;
  object-fit: cover;
  align-items: center;
  justify-content: center;
`;

const P = styled.p`
  font-size: 1.5rem;
  color: var(--color-nature-700);
`;

function ProfileLink() {
  const { user } = useUser();
  const firstletter = user?.email.charAt(0).toUpperCase();

  return (
    <ProfileContainer>
      <StyledProfileLink>
        <P>{firstletter}</P>
      </StyledProfileLink>
      Account
    </ProfileContainer>
  );
}

export default ProfileLink;
