'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AuthErreurPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-primary/5 text-center">
          {/* Error icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </motion.div>

          {/* Logo */}
          <h1 className="text-2xl font-black mb-2">
            <span className="text-primary">MARVEL</span>
            <span className="text-foreground"> NEXUS</span>
          </h1>

          <h2 className="text-xl font-bold text-foreground mb-4">
            Erreur d&apos;authentification
          </h2>

          <p className="text-muted-foreground mb-6">
            Une erreur s&apos;est produite lors de l&apos;authentification. 
            Veuillez réessayer ou contacter le support si le problème persiste.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/auth/connexion">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5">
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer la connexion
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full py-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
