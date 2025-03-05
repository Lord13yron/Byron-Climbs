import styled from "styled-components";
import { formatDate } from "../../utils/helpers";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Button from "../../ui/Button";
import { HiBackspace } from "react-icons/hi2";
import { useUser } from "../../contexts/UserContext";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-height: 450px;
  background-color: var(--color-nature-100);
  color: var(--color-nature-600);
  padding: 1rem;
  border-radius: var(--border-radius-md);
`;

const ListTitle = styled.h2`
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-nature-300);
  text-align: center;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--color-nature-0);
  border: 1px solid var(--color-nature-300);
  padding: 0.5rem;
`;

const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 10fr 1fr;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.button`
  background-color: var(--color-nature-100);
  font-size: 1.25rem;
  border: none;
`;

function ProfileList({ items, title, isLoading, deleteItem }) {
  const [listLength, setListLength] = useState(8);
  const { user } = useUser();
  const paginatedItems = items.slice(0, listLength);

  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <ListItemContainer>
        {paginatedItems.map((item) => (
          <React.Fragment key={item.id}>
            <Link to={`/database/${item.id}`}>
              <ListItem>
                <p>
                  {item.name} - v{item.grade}
                </p>{" "}
                <p>{formatDate(item.sent_at)}</p>
              </ListItem>
            </Link>
            <DeleteButton>
              <HiBackspace
                disabled={isLoading}
                onClick={() =>
                  deleteItem({ climbId: item.id, userId: user.id })
                }
              />
            </DeleteButton>
          </React.Fragment>
        ))}
      </ListItemContainer>
      {listLength < items.length ? (
        <Button onClick={() => setListLength(listLength + 8)}>
          Show more..
        </Button>
      ) : items.length < 8 ? null : (
        <Button onClick={() => setListLength(8)}>Show less..</Button>
      )}
    </ListContainer>
  );
}

export default ProfileList;
