import type { Metadata } from 'next';
import Script from 'next/script';

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
        <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/css/plugins.css" rel="stylesheet" type="text/css" />
        <link href="/css/swiper.css" rel="stylesheet" type="text/css" />
        <link href="/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/css/coloring.css" rel="stylesheet" type="text/css" />
        <link id="colors" href="/css/colors/scheme-01.css" rel="stylesheet" type="text/css" />
      </head>
      <body suppressHydrationWarning>
        <div id="wrapper">
          {children}
        </div>
        <Script src="/js/plugins.js" strategy="beforeInteractive" />
        <Script src="/js/designesia.js" strategy="afterInteractive" />
        <Script src="/js/swiper.js" strategy="afterInteractive" />
        <Script src="/js/custom-marquee.js" strategy="afterInteractive" />
        <Script src="/js/custom-swiper-1.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
