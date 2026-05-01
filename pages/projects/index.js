// pages/projects/index.js
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHero from '@/components/Layout/PageHero';

const projects = [
  {
    href: '/projects/games',
    label: 'Games',
    description:
      'The games were programmed by individuals tasked with envisioning four distinct viewpoints: a human user of digital technologies, a smartphone, a specific environment, and "data." Each game serves as a node in a complex network that intricately intertwines mining and data mining.',
    icon: '🎮',
    color: 'from-pink-500 to-red-500',
    status: 'Live',
  },
  {
    href: '/projects/network',
    label: 'Network Analyses',
    description:
      'Network analysis and visualizations are used to identify key players in the development, implementation and adoption of mining as a process of extraction. These visualizations showcase centrality and interconnectedness so we can visually identify how one industry is closely connected to the other.',
    icon: '🕸️',
    color: 'from-blue-500 to-cyan-500',
    status: 'Live',
  },
  {
    href: '/projects/collage',
    label: 'Collage: Mining Data-Mining',
    description:
      'An interactive visual space exploring the convergence of mining and data mining through curated imagery. Hover, explore, and discover the connections.',
    icon: '🖼️',
    color: 'from-purple-500 to-violet-500',
    status: 'In Progress',
  },
  {
    href: '/projects/rhetorical',
    label: 'Rhetorical Analysis through Digital Tools',
    description:
      'An investigation into the rhetoric of extraction using computational text analysis, natural language processing, and digital humanities methods.',
    icon: '📝',
    color: 'from-amber-500 to-orange-500',
    status: 'Coming Soon',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | D_Mining Lab</title>
        <meta name="description" content="Explore our projects: games, network analyses, collages, and rhetorical analysis." />
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <PageHero
            eyebrow="🔬 Projects"
            title="Our Research Projects"
            text="Each project approaches the intersection of mining and data mining from a different perspective — through play, visualization, art, and critical analysis."
          />

          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={project.href} className="group block h-full">
                    <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 h-full flex flex-col overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_40px_160px_rgba(0,0,0,0.9)]">
                      <div
                        className={`pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${project.color} opacity-10 blur-[80px] transition-opacity duration-300 group-hover:opacity-20`}
                      />

                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <span className="text-3xl">{project.icon}</span>
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                            project.status === 'Live'
                              ? 'text-green-400 border-green-400/30 bg-green-400/10'
                              : project.status === 'In Progress'
                              ? 'text-amber-400 border-amber-400/30 bg-amber-400/10'
                              : 'text-gray-400 border-gray-400/30 bg-gray-400/10'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 relative z-10 group-hover:text-accent-neon transition-colors">
                        {project.label}
                      </h3>

                      <p className="text-sm text-gray-400 leading-relaxed flex-1 relative z-10">
                        {project.description}
                      </p>

                      <span className="inline-flex items-center gap-2 text-[13px] font-medium text-accent-neon group-hover:text-white transition-colors duration-200 mt-6 relative z-10">
                        Explore project
                        <span className="text-[11px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
