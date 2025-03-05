import styled, { css } from "styled-components";

const colors = {
  primary: css`
    color: var(--color-nature-100);
    background-color: var(--color-nature-700);
  `,
  secondary: css`
    color: var(--color-nature-700);
    background-color: var(--color-nature-300);
  `,
  danger: css`
    color: white;
    background-color: red;

    &:hover {
      opacity: 75%;
    }
  `,
};

const Button = styled.button`
  padding: 0.75rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  border: none;

  ${(props) => colors[props.color]}
`;

Button.defaultProps = {
  color: "primary",
};

export default Button;
