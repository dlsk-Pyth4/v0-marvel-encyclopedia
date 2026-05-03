import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCharacters } from "@/components/featured-characters"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedCharacters />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            MARVEL NEXUS - Encyclopédie Interactive non officielle
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Marvel et tous les personnages associés sont des marques de Marvel Entertainment, LLC.
          </p>
        </div>
      </footer>
    </main>
  )
}
