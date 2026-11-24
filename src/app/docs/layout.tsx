/**
 * Docs shell. Inherits the global ConFuse design tokens (globals.css) so the
 * docs index and every /docs/[slug] article share the brand look.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
