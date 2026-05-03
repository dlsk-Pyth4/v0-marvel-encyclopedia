"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, Network } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { CharacterCard } from "@/components/character-card"
import { NetworkVisualization } from "@/components/network-visualization"
import { characters, type Team } from "@/lib/data/characters"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "network"

export default function RoadmapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | "Tous">("Tous")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites()

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) => {
      const matchesSearch =
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTeam = selectedTeam === "Tous" || char.team === selectedTeam
      return matchesSearch && matchesTeam
    })
  }, [searchQuery, selectedTeam])

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-foreground">LA ROADMAP</span>{" "}
              <span className="text-primary text-glow">MARVEL</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explorez le réseau de connexions entre les héros et vilains de l&apos;univers Marvel
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTeam={selectedTeam}
              onTeamChange={setSelectedTeam}
            />
          </motion.div>

          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
            <p className="text-sm text-muted-foreground">
              {filteredCharacters.length} personnage{filteredCharacters.length > 1 ? "s" : ""} trouvé
              {filteredCharacters.length > 1 ? "s" : ""}
            </p>

            <div className="flex items-center gap-2 p-1 bg-card border border-border rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Grille</span>
              </button>
              <button
                onClick={() => setViewMode("network")}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  viewMode === "network"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Network className="w-4 h-4" />
                <span className="hidden sm:inline">Réseau</span>
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {isLoaded &&
                  filteredCharacters.map((character, i) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      index={i}
                      isFavorite={isFavorite(character.id)}
                      onToggleFavorite={() => toggleFavorite(character.id)}
                    />
                  ))}
              </motion.div>
            ) : (
              <motion.div
                key="network"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-card/50 rounded-2xl border border-border p-4"
              >
                <NetworkVisualization />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredCharacters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground mb-2">Aucun personnage trouvé</p>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
