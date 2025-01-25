import { useState, useEffect } from "react"
import Image from "next/image"
import axios from "axios"
import { X } from "lucide-react"

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full h-auto rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            aria-label="Fechar detalhes do filme"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
          <p className="text-muted-foreground mb-4">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Data de Lançamento:</span>{" "}
              {new Date(movie.release_date).toLocaleDateString("pt-BR")}
            </div>
            <div>
              <span className="font-semibold">Avaliação:</span> {movie.vote_average.toFixed(1)}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Gêneros:</span> {movie.genres.map((g) => g.name).join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

