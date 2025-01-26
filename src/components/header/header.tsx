"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import axios from "axios"
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  NavContainer,
  CategoryDropdown,
  CategoryButton,
  CategoryContent,
  CategoryItem,
} from "./styles"

const API_KEY = "b877891c3fbc13ee63626fe60394d1a1"
const BASE_URL = "https://api.themoviedb.org/3"

interface Category {
  id: number
  name: string
}

export function Header({ onCategorySelect }: { onCategorySelect: (categoryId: number | null) => void }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([{ id: 0, name: "Todos" }])
  const [selectedCategory, setSelectedCategory] = useState<Category>({ id: 0, name: "Todos" })

  const categoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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

  const handleCategorySelect = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId) || { id: 0, name: "Todos" }
    setSelectedCategory(category)
    onCategorySelect(categoryId === 0 ? null : categoryId)
    setIsCategoryOpen(false)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <span>Movie</span>App
        </Logo>
        <NavContainer>
          <CategoryDropdown ref={categoryRef}>
            <CategoryButton onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
              {selectedCategory.name}
              <ChevronDown size={18} />
            </CategoryButton>
            <CategoryContent $isOpen={isCategoryOpen}>
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  data-selected={selectedCategory.id === category.id}
                >
                  {category.name}
                </CategoryItem>
              ))}
            </CategoryContent>
          </CategoryDropdown>
        </NavContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}

