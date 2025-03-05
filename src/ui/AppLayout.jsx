import { Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Spinner from "./Spinner";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: #e6e6fa;
  background-image: url("/Background.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function AppLayout() {
  const { isLoading } = useUser();

  return (
    <StyledAppLayout>
      <Header />

      <Main>
        {isLoading ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        ) : (
          <Container>
            <Outlet />
          </Container>
        )}
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
