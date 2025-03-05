import styled from "styled-components";
import Menus from "./Menus";
import { NavLink, useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { useUser } from "../contexts/UserContext";
import ProfileLink from "./ProfileLink";

const StyledHeader = styled.header`
  background-color: var(--color-nature-300);
  padding: 2rem 1rem;
  border-bottom: 1px solid var(--color-nature-100);
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
  justify-content: right;
`;

const Title = styled.h2`
  color: var(--color-nature-500);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const Logo = styled.img`
  height: 100px;
  position: absolute;
  left: 5%;
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-nature-0);
  background-color: var(--color-nature-500);
  border-radius: var(--border-radius-sm);
  padding: 0.25rem;
`;

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  function onClickLogo() {
    navigate("/home");
  }

  return (
    <StyledHeader>
      <Logo onClick={onClickLogo} src="/logo.png" alt="Rock Climbing logo" />

      <Title>
        <NavLink to="home">Byron Climbs</NavLink>
      </Title>

      {user ? (
        <StyledNavLink onClick={logout}>Logout</StyledNavLink>
      ) : (
        <StyledNavLink to="login">Login</StyledNavLink>
      )}

      <Menus>
        <Menus.Menu>
          <Menus.Toggle icon={<HiBars3 />} />

          <Menus.List>
            {user && (
              <Menus.Button>
                <NavLink to="profile">
                  <ProfileLink />
                </NavLink>
              </Menus.Button>
            )}

            <Menus.Button>
              <NavLink to="images">Images</NavLink>
            </Menus.Button>
            <Menus.Button>
              <NavLink to="videos">Videos</NavLink>
            </Menus.Button>
            <Menus.Button>
              <NavLink to="archive">Archive</NavLink>
            </Menus.Button>
            <Menus.Button>
              <NavLink to="database">Database</NavLink>
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </StyledHeader>
  );
}

export default Header;
