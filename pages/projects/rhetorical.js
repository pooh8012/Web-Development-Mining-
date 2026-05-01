// pages/projects/rhetorical.js
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHero from '@/components/Layout/PageHero';

export default function RhetoricalPage() {
  return (
    <>
      <Head>
        <title>Rhetorical Analysis | D_Mining Lab Projects</title>
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <PageHero
            eyebrow="📝 Project 4"
            title="Rhetorical Analysis through Digital Tools"
            text="An investigation into the rhetoric of extraction using computational text analysis, natural language processing, and digital humanities methods."
          />

          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                <span className="text-gray-600">›</span>
                <span className="text-accent-neon">Rhetorical Analysis</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-8 sm:p-12 text-center"
              >
                <div className="text-5xl mb-6">🔮</div>
                <h2 className="text-2xl font-semibold text-white mb-4">Coming Soon</h2>
                <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                  This project is currently in development. We are building tools for rhetorical
                  analysis that will allow researchers to examine how the language of extraction
                  operates across both mining and data mining discourses.
                </p>
              </motion.div>

              {/* Navigation to other projects */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-white mb-4">Other Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link href="/projects/games" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                    <span className="text-lg mb-1 block">🎮</span>
                    <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Games</span>
                  </Link>
                  <Link href="/projects/network" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                    <span className="text-lg mb-1 block">🕸️</span>
                    <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Network Analysis</span>
                  </Link>
                  <Link href="/projects/collage" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                    <span className="text-lg mb-1 block">🖼️</span>
                    <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Collage</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
