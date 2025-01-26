import styled from "styled-components"

export const MovieDetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const MovieDetailContent = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  position: relative;
`

export const MoviePoster = styled.div`
  position: relative;
  width: 40%;
  min-height: 300px;
`

export const MovieInfo = styled.div`
  width: 60%;
  padding: 2rem;
`

export const MovieTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`

export const MovieOverview = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`

export const MovieMetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

export const MovieMetaItem = styled.div`
  font-size: 0.9rem;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
`

