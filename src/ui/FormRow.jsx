import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  align-items: center;
`;

const Error = styled.span`
  color: red;
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
