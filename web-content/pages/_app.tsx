import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { useEffect } from "react";
import Script from "next/script";

import { MeetingProviderComponent } from "../context/StoreContext";
import { refreshToken } from "@/services/httpServices";

const metropolis_Font = localFont({
  src: [
    {
      path: "../public/fonts/Metropolis_Font_family/Metropolis-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Metropolis_Font_family/Metropolis-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Metropolis_Font_family/Metropolis-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-metropolis",
});

interface Window {
  dataLayer: any[];
}

declare var window: Window;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Insert the Clarity script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ncx92k08hy");
    `;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-7E1NXDF3X1");
  }, []);
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-7E1NXDF3X1`}
      />
      <MeetingProviderComponent>
        <Component {...pageProps} />
        <script type="text/javascript"></script>
      </MeetingProviderComponent>
    </>
  );
}
