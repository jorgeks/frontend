import { getAllDocs } from "@/lib/docs";
import type { Metadata } from "next";
import { BookOpen, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "ConFuse - Documentation",
  description:
    "Guides, concepts and learning material for ConFuse — for users, administrators and self-learners.",
};
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import("@/components/layout/navbar").then(mod => mod.Navbar));
const Footer = dynamic(() => import("@/components/layout/footer").then(mod => mod.Footer));

export default async function DocumentationIndex() {
  const docs = getAllDocs();

  return (
    <div className="min-h-screen bg-background">
      <Navbar showUserMenu={false} showAuth={false} />

      <main>
        <section className="relative overflow-hidden pt-28 pb-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-glow-top" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 border border-brand-mid bg-brand-deep/60 text-foreground rounded-[20px] mx-auto">
                <BookOpen className="w-4 h-4 mr-2 text-brand-soft" />
                <span className="text-sm font-medium">Documentation</span>
              </div>
              <h1 className="text-4xl md:text-[64px] leading-[1.05] text-center mb-6">
                <span className="text-gradient-display">Complete Documentation</span>
              </h1>
              <p className="text-lg leading-[1.5] text-subtitle max-w-[768px] mx-auto">
                Everything you need to master ConFuse, from basic setup to advanced integrations.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-lg">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((doc) => (
                <Link key={doc.slug} href={`/docs/${doc.slug}`}>
                  <Card className="card-lit border-border hover:border-brand-mid group relative h-full">
                    <div className="flex flex-col px-6 py-4 gap-4 overflow-hidden h-full">
                      <div className="flex items-center gap-2">
                        <div className="w-11 h-11 shrink-0 border border-brand-mid bg-brand-deep rounded-md flex items-center justify-center group-hover:border-primary/60 transition-colors">
                          <FileText className="w-5 h-5 text-brand-soft" />
                        </div>
                        <CardTitle className="text-base font-semibold text-foreground group-hover:text-brand-soft transition-colors line-clamp-2">
                          {doc.title}
                        </CardTitle>
                      </div>
                      
                      {doc.description && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                          {doc.description}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4">
                        <div className="inline-flex items-center gap-1 rounded-md border border-brand-mid bg-brand-deep px-5 py-2 text-sm font-medium text-foreground transition-colors duration-200 group-hover:bg-brand-mid">
                          Read Document <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
              
              {docs.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No documentation files found in the /docs folder.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
