import { Metadata } from "next";
import { Html, Head, Main, NextScript } from "next/document";

export const metadata: Metadata = {
  title: "Cecure Stream",
  description: "Web video conferencing tool",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className=" metro-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
