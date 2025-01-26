import styled from "styled-components"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`

export const ModalHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
`

export const ModalBody = styled.div`
  padding: 0 1rem 1rem;
`

export const MoviePoster = styled.div`
  position: relative;
  height: 0;
  padding-top: 150%; // 2:3 aspect ratio
  margin-bottom: 1rem;
`

export const MovieTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

export const MovieOverview = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`

export const MovieMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

export const MovieMetaItem = styled.div`
  font-size: 0.9rem;
`

