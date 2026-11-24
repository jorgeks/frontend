/**
 * Integrations shown in the product scene and the marquee. Only sources the
 * app actually connects (see connections/SocialConnections.tsx and
 * sources/*); icons come from the deck (public/integrations).
 */
export const INTEGRATIONS = [
  { src: '/integrations/github.png', name: 'GitHub', kind: 'Repository' },
  { src: '/integrations/gitlab.png', name: 'GitLab', kind: 'Repository' },
  { src: '/integrations/bitbucket.png', name: 'Bitbucket', kind: 'Repository' },
  { src: '/integrations/notion.png', name: 'Notion', kind: 'Documents' },
  { src: '/integrations/google-drive.png', name: 'Google Drive', kind: 'Documents' },
  { src: '/integrations/dropbox.png', name: 'Dropbox', kind: 'Documents' },
  { src: '/integrations/onedrive.png', name: 'OneDrive', kind: 'Documents' },
  { src: '/integrations/slack.png', name: 'Slack', kind: 'Conversations' },
] as const
