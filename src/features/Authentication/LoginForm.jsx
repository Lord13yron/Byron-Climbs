import { useState } from "react";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormTitle from "../../ui/FormTitle";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import supabase from "../../services/supaBase";

const P = styled.p`
  color: var(--color-nature-700);
  margin: 1rem;
`;

const Span = styled.span`
  text-decoration: underline;
  color: var(--color-nature-400);
`;

const GoogleBtn = styled.button`
  display: flex;
  background-color: white;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--border-radius-sm);
  margin-top: 1rem;
`;

function LoginForm() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    await login({ email, password });
    setIsLoading(false);
    setEmail("");
    setPassword("");
  }

  async function handleGoogle(provider) {
    if (provider === "google")
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });

    if (provider === "github")
      await supabase.auth.signInWithOAuth({
        provider: "github",
      });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user.id;

    const { data, error } = await supabase
      .from("users")
      .insert([{ userRole: "user", user_id: userId }])
      .select();

    if (error) {
      console.error(error);
      throw new Error("User could not be signed up");
    }

    return data;
  }

  return (
    <>
      <GoogleBtn onClick={() => handleGoogle("google")}>
        <img
          src="/google.png"
          alt=""
          style={{ width: "20px", height: "20px" }}
        />
        Sign in with google
      </GoogleBtn>
      <GoogleBtn onClick={() => handleGoogle("github")}>
        <img
          src="/github.png"
          alt=""
          style={{ width: "20px", height: "20px" }}
        />
        Sign in with github
      </GoogleBtn>

      <Form onSubmit={handleLogin} style={{ marginTop: "1rem" }}>
        <FormTitle>Log in with Email</FormTitle>
        <FormRow label="Email address:">
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label="Password:">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRow>
        <Button disabled={isLoading}>Log in</Button>
        <P>
          Dont have an Account? Signup{" "}
          <Link to="/signup">
            <Span>Here!</Span>
          </Link>
        </P>
      </Form>
    </>
  );
}

export default LoginForm;
