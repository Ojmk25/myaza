import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local'

import { MeetingProviderComponent } from "../context/StoreContext";

const metropolis_Font = localFont({
  src: [
    {
      path: '../public/fonts/Metropolis_Font_family/Metropolis-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Metropolis_Font_family/Metropolis-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Metropolis_Font_family/Metropolis-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-metropolis',
})

export default function App({ Component, pageProps }: AppProps) {

  return (
    // <html lang="en">
    //   <body className={`${metropolis_Font.variable} font-sans`}>
    <MeetingProviderComponent>
      <Component {...pageProps} />
    </MeetingProviderComponent>
    //   </body>
    // </html>
  )

}
