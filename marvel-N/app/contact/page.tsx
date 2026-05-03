/**
 * ============================================================================
 * PAGE DE CONTACT - /contact
 * ============================================================================
 * 
 * Cette page affiche le formulaire de contact.
 * C'est un Server Component par défaut (pas de 'use client').
 * 
 * Le formulaire lui-même est un Client Component car il gère :
 * - Des états React (useState)
 * - Des événements utilisateur (onChange, onSubmit)
 * - Des appels API (fetch)
 * 
 * ============================================================================
 */

import { Navbar } from "@/components/navbar";
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";

/**
 * Métadonnées de la page pour le SEO
 * Next.js génère automatiquement les balises <title> et <meta>
 */
export const metadata: Metadata = {
  title: "Contact | Marvel Nexus",
  description: "Contactez l'équipe Marvel Nexus. Posez vos questions sur l'univers Marvel.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Section Hero */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Contactez-nous
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une question sur l&apos;univers Marvel ? Une suggestion pour améliorer Marvel Nexus ?
            N&apos;hésitez pas à nous écrire !
          </p>
        </div>
      </section>
      
      {/* Formulaire de Contact */}
      <section className="pb-16 px-4">
        <ContactForm />
      </section>
      
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
  );
}
