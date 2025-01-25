import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X } from "lucide-react"

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

export default function Modal({ isOpen, onClose, movie }: ModalProps) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            width={780}
            height={1170}
            className="w-full h-auto rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
          <p className="text-muted-foreground mb-4">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Avaliação:</span> {movie.vote_average.toFixed(1)}
            </div>
            <div>
              <span className="font-semibold">Data de Lançamento:</span>{" "}
              {new Date(movie.release_date).toLocaleDateString("pt-BR")}
            </div>
            <div>
              <span className="font-semibold">Idioma Original:</span> {movie.original_language.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

