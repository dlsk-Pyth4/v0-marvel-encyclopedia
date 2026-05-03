/**
 * ============================================================================
 * PAGE ADMIN - Liste des Messages de Contact
 * ============================================================================
 * 
 * Cette page affiche tous les messages reçus via le formulaire de contact.
 * Elle démontre la récupération de données depuis l'API (GET /api/contacts).
 * 
 * ARCHITECTURE :
 * - Server Component pour le rendu initial
 * - Appel direct à la base de données (pas besoin de fetch côté serveur)
 * 
 * SÉCURITÉ (à implémenter en production) :
 * - Cette page devrait être protégée par une authentification
 * - Seuls les administrateurs devraient y avoir accès
 * 
 * ============================================================================
 */

import { Navbar } from "@/components/navbar";
import { getAllContacts, countContacts } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Calendar, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Messages | Marvel Nexus",
  description: "Administration des messages de contact",
};

/**
 * Force le rendu dynamique (pas de cache)
 * Les données de contact changent fréquemment
 */
export const dynamic = 'force-dynamic';

export default function AdminContactsPage() {
  /**
   * Récupération des données directement depuis la BDD
   * 
   * Dans un Server Component, on peut accéder directement à la BDD
   * car le code s'exécute côté serveur
   */
  const contacts = getAllContacts();
  const totalCount = countContacts();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Messages de Contact
              </h1>
              <p className="text-muted-foreground mt-1">
                Administration des messages reçus
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {totalCount} message{totalCount > 1 ? 's' : ''}
            </Badge>
          </div>
        </div>
      </section>
      
      {/* Liste des contacts */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {contacts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  Aucun message pour le moment
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Les messages envoyés via le formulaire de contact apparaîtront ici.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {contact.nom}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-foreground">Sujet : </span>
                        <span className="text-sm text-muted-foreground">{contact.sujet}</span>
                      </div>
                      {contact.personnage_prefere && (
                        <div>
                          <span className="text-sm font-medium text-foreground">
                            Personnage préféré :{" "}
                          </span>
                          <Badge variant="outline">{contact.personnage_prefere}</Badge>
                        </div>
                      )}
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {contact.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            MARVEL NEXUS - Panel Administration
          </p>
        </div>
      </footer>
    </main>
  );
}
