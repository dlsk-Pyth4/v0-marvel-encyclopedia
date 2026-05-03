'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function InscriptionReussiePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-primary/5 text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>

          {/* Logo */}
          <h1 className="text-2xl font-black mb-2">
            <span className="text-primary">MARVEL</span>
            <span className="text-foreground"> NEXUS</span>
          </h1>

          <h2 className="text-xl font-bold text-foreground mb-4">
            Inscription réussie !
          </h2>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground">
              Un email de confirmation a été envoyé à votre adresse. 
              Veuillez cliquer sur le lien dans l&apos;email pour activer votre compte.
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Pensez à vérifier votre dossier spam si vous ne trouvez pas l&apos;email.
          </p>

          <Link href="/auth/connexion">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6">
              Aller à la page de connexion
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <div className="mt-6">
            <Link 
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
