import { createContext, useContext, useState } from "react";
import styled from "styled-components";

import { createPortal } from "react-dom";
import UseOutsideClick from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: var(--color-nature-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-nature-600);
  }
`;

const StyledList = styled.ul`
  list-style-type: none;
  position: fixed;
  background-color: var(--color-nature-0);
  border-radius: var(--border-radius-sm);
  width: 115px;

  top: ${(props) => props.$position.top + 5}px;
  left: ${(props) => props.$position.left - 115}px;
`;

const StyledButton = styled.button`
  font-size: 16px;
  border: none;
  background: none;
  margin: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        open,
        setPosition,
        position,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, icon }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({ left: rect.right, top: rect.bottom });

    if (openId === id) {
      close();
    } else {
      open(id);
    }
  }

  return <StyledToggle onClick={handleClick}>{icon}</StyledToggle>;
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = UseOutsideClick(close, false);

  if (!position || openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, onClick, icon }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
