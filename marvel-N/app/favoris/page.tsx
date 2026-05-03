"use client"

import { useMemo, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, ArrowRight, LogOut, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { CharacterCard } from "@/components/character-card"
import { Button } from "@/components/ui/button"
import { characters } from "@/lib/data/characters"
import { useFavorites } from "@/hooks/use-favorites"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite, isLoaded } = useFavorites()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoadingUser(false)
    }

    getUser()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const favoriteCharacters = useMemo(() => {
    return characters.filter((char) => favorites.includes(char.id))
  }, [favorites])

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-foreground">MES</span>{" "}
              <span className="text-primary text-glow">FAVORIS</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Votre collection personnelle de héros et vilains Marvel préférés
            </p>
          </motion.div>

          {/* User Info Card */}
          {!isLoadingUser && user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {user.user_metadata?.display_name || "Utilisateur"}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Content */}
          {!isLoaded ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : favoriteCharacters.length > 0 ? (
            <>
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-8 mb-12 py-6 border-y border-border"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{favoriteCharacters.length}</div>
                  <div className="text-sm text-muted-foreground">Personnages</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(
                      favoriteCharacters.reduce((sum, c) => sum + c.power_level, 0) /
                        favoriteCharacters.length
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Puissance Moyenne</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {new Set(favoriteCharacters.map((c) => c.team)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Équipes</div>
                </div>
              </motion.div>

              {/* Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {favoriteCharacters.map((character, i) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    index={i}
                    isFavorite={isFavorite(character.id)}
                    onToggleFavorite={() => toggleFavorite(character.id)}
                  />
                ))}
              </motion.div>
            </>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-card rounded-full border border-border mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Aucun favori pour le moment</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Commencez à explorer l&apos;univers Marvel et ajoutez vos héros préférés à votre collection
              </p>
              <Link href="/roadmap">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  Explorer la Roadmap
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
