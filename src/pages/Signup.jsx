import styled from "styled-components";

import SignupForm from "../features/Authentication/SignupForm";
import { Helmet } from "react-helmet-async";

const SignupLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  margin-top: 4rem;
  padding: 0.5rem;
  align-items: center;
  border-radius: var(--border-radius-md);
  background-color: var(--color-nature-0);
  color: var(--color-nature-600);
`;

function Signup() {
  return (
    <SignupLayout>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
