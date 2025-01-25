"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import axios from "axios"
import { MovieDetailCard } from "./movieDetailCard"

const API_KEY = "b877891c3fbc13ee63626fe60394d1a1"
const BASE_URL = "https://api.themoviedb.org/3"

interface Movie {
  id: number
  title: string
}

interface Category {
  id: number
  name: string
}

export function Header({ onCategorySelect }: { onCategorySelect: (categoryId: number | null) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [categories, setCategories] = useState<Category[]>([{ id: 0, name: "Todos" }])
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>({ id: 0, name: "Todos" })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([])
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
          },
        })
        setCategories([{ id: 0, name: "Todos" }, ...response.data.genres])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([{ id: 0, name: "Todos" }])
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
              api_key: API_KEY,
              language: "pt-BR",
              query: searchQuery,
            },
          })
          setSearchResults(response.data.results.slice(0, 5))
        } catch (error) {
          console.error("Error searching movies:", error)
        }
      } else {
        setSearchResults([])
      }
    }

    const debounce = setTimeout(() => {
      searchMovies()
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchQuery])

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId)
    setSearchQuery("")
    setSearchResults([])
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    onCategorySelect(category.id === 0 ? null : category.id)
    setIsDropdownOpen(false)
    if (isMenuOpen) {
      toggleMenu()
    }
  }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 space-y-4 md:space-y-0">
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
            <div className="text-2xl font-bold mr-4">
              <span className="text-yellow-300">Movie</span>App
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-2xl">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          <div className={`w-full md:w-auto ${isMenuOpen ? "block" : "hidden md:block"}`}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-64" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Buscar filmes..."
                  className="w-full px-4 py-2 rounded-full bg-white text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 py-2 bg-white rounded-md shadow-xl">
                    {searchResults.map((movie) => (
                      <div
                        key={movie.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                        onClick={() => handleMovieClick(movie.id)}
                      >
                        {movie.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full md:w-auto px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-between"
                >
                  {selectedCategory.name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-56 mt-2 py-2 bg-white rounded-md shadow-xl">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedMovieId && <MovieDetailCard movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />}
    </header>
  )
}

