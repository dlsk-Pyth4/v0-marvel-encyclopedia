"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { characters } from "@/lib/data/characters"
import { Button } from "@/components/ui/button"

const featuredCharacters = characters.slice(0, 6)

export function FeaturedCharacters() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Personnages <span className="text-primary">Emblématiques</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez les héros et vilains qui façonnent l&apos;univers Marvel
          </p>
        </motion.div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCharacters.map((character, i) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/personnage/${character.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors marvel-glow"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={character.image_url}
                      alt={character.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Team Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 rounded-full text-xs font-medium text-primary-foreground">
                      {character.team}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {character.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {character.description}
                    </p>

                    {/* Power Level */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">Puissance</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${character.power_level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <span className="text-xs font-bold text-primary">{character.power_level}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/roadmap">
            <Button variant="outline" size="lg" className="group">
              Voir tous les personnages
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
