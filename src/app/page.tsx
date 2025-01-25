"use client"

import { useState } from "react"
import { Header } from "../components/header"
import MovieList from "../components/movieList"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onCategorySelect={handleCategorySelect} />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <MovieList selectedCategory={selectedCategory} />
      </main>
    </div>
  )
}

