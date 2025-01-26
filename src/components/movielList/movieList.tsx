"use client";

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import axios from "axios"
import { Modal } from "../modal/modal"
import {
  MovieListContainer,
  MovieGrid,
  MovieCard,
  MoviePoster,
  MovieInfo,
  MovieTitle,
  MovieOverview,
  MovieMeta,
  MovieRating,
  MovieButton,
} from "./styles"

// Interfaces
interface MovieType {
  id: number
  title: string
  poster_path: string
  overview: string
  vote_average: number
  release_date: string
  original_language: string
}

interface CategoryType {
  id: number
  name: string
}

// Constantes
const API_KEY = "b877891c3fbc13ee63626fe60394d1a1"
const BASE_URL = "https://api.themoviedb.org/3"

interface MovieListProps {
  selectedCategory: number | null
}

export default function MovieList({ selectedCategory }: MovieListProps) {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [moviesByCategory, setMoviesByCategory] = useState<{ [key: number]: MovieType[] }>({})
  const [allMovies, setAllMovies] = useState<MovieType[]>([])
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
        },
      })
      setCategories(response.data.genres)
      response.data.genres.forEach((category: CategoryType) => {
        getMoviesByCategory(category.id)
      })
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      setError("Não foi possível carregar as categorias. Por favor, tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getAllMovies = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
          page: 1,
        },
      })
      setAllMovies(response.data.results)
    } catch (error) {
      console.error("Erro ao buscar todos os filmes:", error)
      setError("Não foi possível carregar os filmes. Por favor, tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  const getMoviesByCategory = async (categoryId: number) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
          with_genres: categoryId,
          page: 1,
        },
      })
      setMoviesByCategory((prev) => ({
        ...prev,
        [categoryId]: response.data.results,
      }))
    } catch (error) {
      console.error(`Erro ao buscar filmes para a categoria ${categoryId}:`, error)
      setError("Não foi possível carregar os filmes desta categoria. Por favor, tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [getCategories])

  useEffect(() => {
    if (selectedCategory === null) {
      getAllMovies()
    } else {
      getMoviesByCategory(selectedCategory)
    }
  }, [selectedCategory])

  const openModal = (movie: MovieType) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const renderMovies = (movies: MovieType[]) => (
    <MovieGrid>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
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
            <MovieMeta>
              <MovieRating>{movie.vote_average.toFixed(1)}</MovieRating>
              <MovieButton onClick={() => openModal(movie)}>Ver mais</MovieButton>
            </MovieMeta>
          </MovieInfo>
        </MovieCard>
      ))}
    </MovieGrid>
  )

  return (
    <MovieListContainer>
      {selectedCategory === null ? (
        <section>
          <h2>Todos os Filmes</h2>
          {renderMovies(allMovies)}
        </section>
      ) : (
        categories
          .filter((category) => category.id === selectedCategory)
          .map((category) => (
            <section key={category.id}>
              <h2>{category.name}</h2>
              {renderMovies(moviesByCategory[category.id] || [])}
            </section>
          ))
      )}
      {selectedMovie && <Modal isOpen={isModalOpen} onClose={closeModal} movie={selectedMovie} />}
    </MovieListContainer>
  )
}
