"use client";
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X } from "lucide-react"
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  MoviePoster,
  MovieTitle,
  MovieOverview,
  MovieMetaGrid,
  MovieMetaItem,
} from "./styles"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  movie: {
    title: string
    overview: string
    poster_path: string
    vote_average: number
    release_date: string
    original_language: string
  }
}

export function Modal({ isOpen, onClose, movie }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <ModalHeader>
          <ModalCloseButton onClick={onClose}>
            <X size={24} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <MoviePoster>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              layout="fill"
              objectFit="cover"
            />
          </MoviePoster>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieOverview>{movie.overview}</MovieOverview>
          <MovieMetaGrid>
            <MovieMetaItem>
              <strong>Avaliação:</strong> {movie.vote_average.toFixed(1)}
            </MovieMetaItem>
            <MovieMetaItem>
              <strong>Data de Lançamento:</strong> {new Date(movie.release_date).toLocaleDateString("pt-BR")}
            </MovieMetaItem>
            <MovieMetaItem>
              <strong>Idioma Original:</strong> {movie.original_language.toUpperCase()}
            </MovieMetaItem>
          </MovieMetaGrid>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>,
    document.body,
  )
}

