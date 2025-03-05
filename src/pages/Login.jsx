import styled from "styled-components";
import LoginForm from "../features/Authentication/LoginForm";
import { Helmet } from "react-helmet-async";

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  margin-top: 4rem;
  padding: 0.5rem 1rem;

  align-items: center;
  border-radius: var(--border-radius-md);
  background-color: var(--color-nature-0);
  color: var(--color-nature-600);
`;

function Login() {
  return (
    <LoginLayout>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
