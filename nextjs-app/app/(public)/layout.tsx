import Script from 'next/script';
import ScriptInitializer from '@/components/ScriptInitializer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
      <link href="/css/plugins.css" rel="stylesheet" type="text/css" />
      <link href="/css/swiper.css" rel="stylesheet" type="text/css" />
      <link href="/css/style.css" rel="stylesheet" type="text/css" />
      <link href="/css/coloring.css" rel="stylesheet" type="text/css" />
      <link id="colors" href="/css/colors/scheme-01.css" rel="stylesheet" type="text/css" />
      <div id="wrapper">
        {children}
      </div>
      <ScriptInitializer />
      <Script src="/js/plugins.js" strategy="beforeInteractive" />
      <Script src="/js/designesia.js" strategy="afterInteractive" />
      <Script src="/js/swiper.js" strategy="afterInteractive" />
      <Script src="/js/custom-marquee.js" strategy="afterInteractive" />
    </>
  );
}
