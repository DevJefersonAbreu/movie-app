import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Movie App",
  description: "Descubra filmes populares",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

