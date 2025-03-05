import styled from "styled-components";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";

const ConfirmDeleteBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  gap: 0.5rem;
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <ConfirmDeleteBox>
      Are you sure you want to delete {resourceName}?
      <ButtonGroup>
        <Button disabled={disabled} color="primary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          color="danger"
          type="button"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </ButtonGroup>
    </ConfirmDeleteBox>
  );
}

export default ConfirmDelete;
