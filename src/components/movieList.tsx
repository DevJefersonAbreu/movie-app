"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import Modal from "./modal";

interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  original_language: string;
}

interface CategoryType {
  id: number;
  name: string;
}

const API_KEY = "b877891c3fbc13ee63626fe60394d1a1";
const BASE_URL = "https://api.themoviedb.org/3";

interface MovieListProps {
  selectedCategory: number | null;
}

export default function MovieList({ selectedCategory }: MovieListProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [moviesByCategory, setMoviesByCategory] = useState<{ [key: number]: MovieType[] }>({});
  const [allMovies, setAllMovies] = useState<MovieType[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
        },
      });
      setCategories(response.data.genres);
      response.data.genres.forEach((category: CategoryType) => {
        getMoviesByCategory(category.id);
      });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setError("Não foi possível carregar as categorias. Por favor, tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMoviesByCategory = async (categoryId: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
          with_genres: categoryId,
          page: 1,
        },
      });
      setMoviesByCategory((prev) => ({
        ...prev,
        [categoryId]: response.data.results,
      }));
    } catch (error) {
      console.error(`Erro ao buscar filmes para a categoria ${categoryId}:`, error);
      setError("Não foi possível carregar os filmes desta categoria. Por favor, tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
          page: 1,
        },
      });
      setAllMovies(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar todos os filmes:", error);
      setError("Não foi possível carregar os filmes. Por favor, tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (selectedCategory === null) {
      getAllMovies();
    } else {
      getMoviesByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const openModal = (movie: MovieType) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  const renderMovies = (movies: MovieType[]) => (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <div className="relative h-0 pb-[150%]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 line-clamp-1">{movie.title}</h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{movie.overview}</p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {movie.vote_average.toFixed(1)}
              </span>
              <button
                onClick={() => openModal(movie)}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Ver mais
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-8">
      {selectedCategory === null ? (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Todos os Filmes</h2>
          {renderMovies(allMovies)}
        </section>
      ) : (
        categories
          .filter((category) => category.id === selectedCategory)
          .map((category) => (
            <section key={category.id}>
              <h2 className="text-2xl font-bold mb-4 text-primary">{category.name}</h2>
              {renderMovies(moviesByCategory[category.id] || [])}
            </section>
          ))
      )}
      {selectedMovie && <Modal isOpen={isModalOpen} onClose={closeModal} movie={selectedMovie} />}
    </div>
  );
}
