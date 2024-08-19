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

    // Load Jira Service Desk Widget
    const script1 = document.createElement("script");
    script1.setAttribute("data-jsd-embedded", "true");
    script1.setAttribute("data-key", "9d24ca79-7b09-44b7-9288-d551d44f19f1");
    script1.setAttribute("data-base-url", "https://jsd-widget.atlassian.com");
    script1.src = "https://jsd-widget.atlassian.com/assets/embed.js";
    document.body.appendChild(script1);

    // Load Jira Issue Collector
    const script2 = document.createElement("script");
    script2.src =
      "https://cil.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/278rlr/b/8/c95134bc67d3a521bb3f4331beb9b804/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-GB&collectorId=09cb9927";
    document.body.appendChild(script2);
    // Cleanup script tags on component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
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
