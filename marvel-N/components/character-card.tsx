"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Character } from "@/lib/data/characters"

interface CharacterCardProps {
  character: Character
  index: number
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function CharacterCard({ character, index, isFavorite, onToggleFavorite }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          "relative bg-card rounded-xl overflow-hidden border-2 transition-all duration-300",
          "border-border hover:border-primary marvel-glow"
        )}
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleFavorite()
          }}
          className={cn(
            "absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300",
            isFavorite
              ? "bg-primary text-primary-foreground"
              : "bg-background/80 text-muted-foreground hover:text-primary hover:bg-background"
          )}
        >
          <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
        </button>

        <Link href={`/personnage/${character.id}`}>
          {/* Image Container */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <Image
              src={character.image_url}
              alt={character.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Team Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-foreground">
              {character.team}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold mb-0.5 group-hover:text-primary transition-colors">
              {character.name}
            </h3>
            <p className="text-xs text-primary/80 mb-2">{character.realName}</p>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {character.description}
            </p>

            {/* Power Level Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Niveau de Puissance</span>
                <span className="font-bold text-primary">{character.power_level}/100</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${character.power_level}%` }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full power-bar-animate"
                />
              </div>
            </div>

            {/* Powers Preview */}
            <div className="flex flex-wrap gap-1 mt-3">
              {character.powers.slice(0, 2).map((power, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-secondary text-xs text-muted-foreground rounded"
                >
                  {power}
                </span>
              ))}
              {character.powers.length > 2 && (
                <span className="px-2 py-0.5 bg-primary/20 text-xs text-primary rounded">
                  +{character.powers.length - 2}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}
