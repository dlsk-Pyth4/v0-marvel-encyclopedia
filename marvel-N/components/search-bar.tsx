"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { teams, type Team } from "@/lib/data/characters"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedTeam: Team | "Tous"
  onTeamChange: (team: Team | "Tous") => void
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  selectedTeam,
  onTeamChange,
}: SearchBarProps) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un personnage..."
          className="w-full h-12 pl-12 pr-12 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Team Filters */}
      <div className="flex flex-wrap gap-2">
        {teams.map((team) => (
          <motion.button
            key={team}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTeamChange(team)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              selectedTeam === team
                ? "bg-primary text-primary-foreground marvel-glow"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            )}
          >
            {team}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
