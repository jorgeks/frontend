import { GitBranch, FileText, MessageSquare, Terminal, type LucideIcon } from 'lucide-react'

/**
 * What ConFuse unifies, by category, exactly as the public site describes it:
 * - Repositories: GitHub, GitLab, Bitbucket (feature copy, /help, /changelog 0.3.0)
 * - Documents: PDF, DOCX, Markdown (/changelog 0.3.0) and web pages (/changelog 0.2.0, /docs/connecting-sources)
 * - Conversations: chat-platform conversations (feature copy); Slack is the one named (/llms.txt)
 * - Logs: cloud logs streamed via Kafka from AWS, GCP and Azure (/changelog 0.4.0)
 */
export type SourceItem = { label: string; icon?: string }
export type SourceCategory = { id: 'repo' | 'docs' | 'chat' | 'logs'; name: string; icon: LucideIcon; items: SourceItem[] }

export const SOURCE_CATEGORIES: SourceCategory[] = [
  {
    id: 'repo',
    name: 'Repositories',
    icon: GitBranch,
    items: [
      { label: 'GitHub', icon: '/integrations/github.png' },
      { label: 'GitLab', icon: '/integrations/gitlab.png' },
      { label: 'Bitbucket', icon: '/integrations/bitbucket.png' },
    ],
  },
  {
    id: 'docs',
    name: 'Documentation',
    icon: FileText,
    items: [{ label: 'PDF' }, { label: 'DOCX' }, { label: 'Markdown' }, { label: 'Web pages' }],
  },
  {
    id: 'chat',
    name: 'Conversations',
    icon: MessageSquare,
    items: [{ label: 'Slack', icon: '/integrations/slack.png' }, { label: 'Chat threads' }],
  },
  {
    id: 'logs',
    name: 'Logs',
    icon: Terminal,
    items: [{ label: 'AWS' }, { label: 'GCP' }, { label: 'Azure' }],
  },
]

/** Integrations named on the public site, for the marquee. */
export const INTEGRATIONS = [
  { src: '/integrations/github.png', name: 'GitHub' },
  { src: '/integrations/gitlab.png', name: 'GitLab' },
  { src: '/integrations/bitbucket.png', name: 'Bitbucket' },
  { src: '/integrations/notion.png', name: 'Notion' },
  { src: '/integrations/google-drive.png', name: 'Google Drive' },
  { src: '/integrations/slack.png', name: 'Slack' },
] as const
