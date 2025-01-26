"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import axios from "axios"
import { X } from "lucide-react"
import {
  MovieDetailContainer,
  MovieDetailContent,
  MoviePoster,
  MovieInfo,
  MovieTitle,
  MovieOverview,
  MovieMetaGrid,
  MovieMetaItem,
  CloseButton,
} from "./styles"

interface MovieDetailProps {
  movieId: number
  onClose: () => void
}

interface MovieDetail {
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  genres: { id: number; name: string }[]
}

const API_KEY = "b877891c3fbc13ee63626fe60394d1a1"
const BASE_URL = "https://api.themoviedb.org/3"

export function MovieDetailCard({ movieId, onClose }: MovieDetailProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
          },
        })
        setMovie(response.data)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }

    fetchMovieDetails()
  }, [movieId])

  if (!movie) return null

  return (
    <MovieDetailContainer>
      <MovieDetailContent>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        <MoviePoster>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
          />
        </MoviePoster>
        <MovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieOverview>{movie.overview}</MovieOverview>
          <MovieMetaGrid>
            <MovieMetaItem>
              <strong>Data de Lançamento:</strong> {new Date(movie.release_date).toLocaleDateString("pt-BR")}
            </MovieMetaItem>
            <MovieMetaItem>
              <strong>Avaliação:</strong> {movie.vote_average.toFixed(1)}
            </MovieMetaItem>
            <MovieMetaItem>
              <strong>Gêneros:</strong> {movie.genres.map((g) => g.name).join(", ")}
            </MovieMetaItem>
          </MovieMetaGrid>
        </MovieInfo>
      </MovieDetailContent>
    </MovieDetailContainer>
  )
}

