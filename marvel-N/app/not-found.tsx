"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <span className="text-9xl sm:text-[12rem] font-black text-primary/20">404</span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Personnage <span className="text-primary">Introuvable</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Ce héros semble avoir disparu dans une autre dimension. Peut-être Doctor Strange pourrait vous aider ?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Home className="w-4 h-4" />
                Retour à l&apos;accueil
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button variant="outline" className="gap-2">
                <Search className="w-4 h-4" />
                Explorer la Roadmap
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
