"use client"

import { use, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Heart, Zap, Users, Shield, BookOpen, Film, Calendar } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { characters } from "@/lib/data/characters"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

export default function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const character = characters.find((c) => c.id === id)
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites()

  const connectedCharacters = useMemo(() => {
    if (!character) return []
    return character.connections
      .map((connId) => characters.find((c) => c.id === connId))
      .filter(Boolean)
  }, [character])

  if (!character) {
    notFound()
  }

  const favorite = isLoaded && isFavorite(character.id)

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {/* Background Image */}
          <Image
            src={character.image_url}
            alt={character.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
              >
                <Link href="/roadmap">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la Roadmap
                  </Button>
                </Link>
              </motion.div>

              {/* Character Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block px-4 py-1 bg-primary rounded-full text-sm font-semibold text-primary-foreground mb-4">
                  {character.team}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-2">
                  {character.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {character.realName}
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {character.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Biography & Powers */}
            <div className="lg:col-span-2 space-y-8">
              {/* Biography */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl border border-border p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Biographie</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {character.biography}
                </p>
              </motion.section>

              {/* Appearances Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-card rounded-2xl border border-border p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Apparitions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Comic Appearance */}
                  <div className="bg-secondary/30 rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-lg">Comics</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Première apparition</p>
                        <p className="text-foreground font-medium">{character.comicAppearance.first}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Comic</p>
                        <p className="text-primary font-semibold">{character.comicAppearance.comic}</p>
                      </div>
                    </div>
                  </div>

                  {/* MCU Appearance */}
                  {character.mcuAppearance ? (
                    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <Film className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-lg">MCU</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Première apparition ({character.mcuAppearance.first})</p>
                          <p className="text-foreground font-medium">{character.mcuAppearance.firstFilm}</p>
                        </div>
                        {character.mcuAppearance.last && character.mcuAppearance.lastFilm && (
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Dernière apparition ({character.mcuAppearance.last})</p>
                            <p className="text-primary font-semibold">{character.mcuAppearance.lastFilm}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-secondary/30 rounded-xl p-5 border border-border flex items-center justify-center">
                      <div className="text-center">
                        <Film className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">Pas encore apparu dans le MCU</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>

              {/* Powers */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl border border-border p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Pouvoirs & Capacités</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {character.powers.map((power, i) => (
                    <motion.div
                      key={power}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-foreground font-medium">{power}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Connected Characters */}
              {connectedCharacters.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-card rounded-2xl border border-border p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Connexions</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {connectedCharacters.map((conn, i) => (
                      <Link key={conn!.id} href={`/personnage/${conn!.id}`}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="group text-center"
                        >
                          <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors marvel-glow">
                            <Image
                              src={conn!.image_url}
                              alt={conn!.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {conn!.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{conn!.team}</p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Right Column - Stats & Actions */}
            <div className="space-y-6">
              {/* Favorite Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={() => toggleFavorite(character.id)}
                  className={cn(
                    "w-full h-14 text-lg font-semibold gap-3",
                    favorite
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <Heart className={cn("w-6 h-6", favorite && "fill-current")} />
                  {favorite ? "Dans vos favoris" : "Ajouter aux favoris"}
                </Button>
              </motion.div>

              {/* Power Level Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="text-lg font-bold mb-4">Niveau de Puissance</h3>
                
                {/* Circular Progress */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-secondary"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeLinecap="round"
                      className="text-primary"
                      strokeDasharray={440}
                      initial={{ strokeDashoffset: 440 }}
                      animate={{ strokeDashoffset: 440 - (440 * character.power_level) / 100 }}
                      transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-4xl font-black text-primary"
                    >
                      {character.power_level}
                    </motion.span>
                  </div>
                </div>

                {/* Power Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Puissance globale</span>
                    <span className="font-bold text-foreground">{character.power_level}/100</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${character.power_level}%` }}
                      transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="text-lg font-bold mb-4">Informations</h3>
                <div className="space-y-4">
                  {[
                    { label: "Nom réel", value: character.realName },
                    { label: "Équipe", value: character.team },
                    { label: "Pouvoirs", value: `${character.powers.length} capacités` },
                    { label: "Connexions", value: `${character.connections.length} alliés/ennemis` },
                    { label: "Créé en", value: character.comicAppearance.year.toString() },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-medium text-foreground text-right max-w-[60%]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
