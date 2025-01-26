import styled from "styled-components"

export const MovieListContainer = styled.div`
  padding: 2rem 0;
`

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`

export const MovieCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

export const MoviePoster = styled.div`
  position: relative;
  height: 0;
  padding-top: 150%; // 2:3 aspect ratio
`

export const MovieInfo = styled.div`
  padding: 1rem;
`

export const MovieTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

export const MovieOverview = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const MovieMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MovieRating = styled.span`
  background-color: #f1c40f;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`

export const MovieButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`

