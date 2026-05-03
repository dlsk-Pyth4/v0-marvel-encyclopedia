"use client"

import { useState, useEffect, useCallback } from "react"

const FAVORITES_KEY = "marvel-nexus-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
    setIsLoaded(true)
  }, [])

  const toggleFavorite = useCallback((characterId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  const isFavorite = useCallback(
    (characterId: string) => favorites.includes(characterId),
    [favorites]
  )

  return { favorites, toggleFavorite, isFavorite, isLoaded }
}
