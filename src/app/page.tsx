"use client"

import { useState } from "react"
import { Header } from "../components/header/header"
import MovieList from "../components/movielList/movieList"
import { PageContainer, MainContent } from "./styles"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <PageContainer>
      <Header onCategorySelect={handleCategorySelect} />
      <MainContent>
        <MovieList selectedCategory={selectedCategory} />
      </MainContent>
    </PageContainer>
  )
}

