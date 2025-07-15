import HomePage from "@/components/Home/HomePage";
import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <HomePage />
      <Component {...pageProps} />
    </>
  );
}
