import styled from "styled-components"

export const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  span {
    color: #e74c3c;
  }
`

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    width: 250px;
  }
`

export const CategoryDropdown = styled.div`
  position: relative;
  width: 100%;
`

export const CategoryButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const CategoryContent = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #34495e;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
`

export const CategoryItem = styled.div<{ "data-selected": boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: white;
  background-color: ${({ "data-selected": selected }) => (selected ? "#2980b9" : "transparent")};
  transition: background-color 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: #3498db;
  }
`

