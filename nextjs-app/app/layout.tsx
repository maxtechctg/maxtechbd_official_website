import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MaxTech — IT Solutions and Services',
  description: 'MaxTech — IT Solutions and Services Website. We are a team of tech enthusiasts dedicated to taking your technology aspirations to new heights.',
  keywords: 'IT Solutions, Software Development, Web Development, Mobile Apps, Technology Services',
  openGraph: {
    title: 'MaxTech — IT Solutions and Services',
    description: 'We are a team of tech enthusiasts dedicated to taking your technology aspirations to new heights.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/icon.png" type="image/gif" sizes="16x16" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
