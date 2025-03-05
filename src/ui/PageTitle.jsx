import styled from "styled-components";

const Title = styled.div`
  display: flex;
  background-color: var(--color-nature-50);
  opacity: 85%;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  margin-bottom: 3.2rem;

  @media (max-width: 450px) {
    width: 100%;
  }
`;

const H2 = styled.h2`
  color: var(--color-nature-700);
  margin-bottom: 0.5rem;
`;

const P = styled.p`
  color: var(--color-nature-700);
`;

function PageTitle({ title, subtitle }) {
  return (
    <Title>
      <H2>{title}</H2>
      <P>{subtitle}</P>
    </Title>
  );
}

export default PageTitle;
