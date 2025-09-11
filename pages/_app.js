// pages/_app.js
import "../styles/globals.css";
import "../styles/animations.css";
import "../styles/gaia.css";
import Layout from "../components/Layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Web-Development-Mining and Data mining + AI</title>
        <meta
          name="description"
          content="Interactive web platform for mining and data-mining research & visualization"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* Font imports */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');
          `}
        </style>
      </Head>

      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
