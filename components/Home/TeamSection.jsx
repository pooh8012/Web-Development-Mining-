import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const GlassCard = ({ children, className = '' }) => (
  <div
    className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl ${className}`}
  >
    {children}
  </div>
);

const teamMembers = [
  {
    name: 'Eduard Arriaga-Arango',
    role: 'Project Lead & Research Director',
    specialty: 'Digital Humanities & AI Language Research',
    image: '/images/Eduard_Arriaga.jpeg',
    color: 'from-blue-500 to-cyan-500',
    bio: 'Associate Professor and Chair of the Language, Literature and Culture Department at Clark University. Researches at the intersection of digital humanities, Afro-Latinx and Afro-Latin American studies.',
    skills: [
      'Python',
      'Git',
      'Wandora',
      'Gephi',
      'Digital Humanities',
      'AI Research',
    ],
  },
  {
    name: 'Andrés Villar',
    role: 'Visual Artist & Creative Director',
    specialty: 'Artistic Vision & Visual Design',
    image: '/images/Villar_avatar.jpg',
    color: 'from-purple-500 to-pink-500',
    bio: "An artist based in St. Thomas, Ontario, Canada, bringing creative vision and artistic expertise to the project's visual elements and conceptual design.",
    skills: ['Visual Arts', 'Creative Direction', 'Conceptual Design'],
  },
  {
    name: 'Pooja Pithva',
    role: 'Full Stack Developer',
    specialty: 'Website Development & UI Implementation',
    image: '/images/PoojaPithva.jpeg',
    color: 'from-pink-500 to-purple-500',
    bio: 'Lead developer responsible for the entire website implementation, from UI/UX design to full-stack development using Next.js and React.',
    skills: [
      'Next.js',
      'React',
      'D3.js',
      'Tailwind CSS',
      'Full Stack Development',
      'UI/UX',
    ],
  },
  {
    name: 'Yaksh Goyani',
    role: 'Game Developer',
    specialty: 'Game Design & Programming',
    image: '/images/YakshGoyani.jpg',
    color: 'from-green-500 to-teal-500',
    bio: 'Second-year MFA student at Clark University with a passion for game development, focusing on game design and programming.',
    skills: ['Game Design', 'Game Programming', 'Unity', 'Educational Games'],
  },
  {
    name: 'Lauren Gallagher',
    role: 'Level Designer & Game Developer',
    specialty: 'Level Design & Immersive Experiences',
    image: '/images/LaurenGallagher.png',
    color: 'from-orange-500 to-red-500',
    bio: 'MFA student at Clark University pursuing Interactive Media with a focus on Game Design. Specializes in level design and crafting immersive player experiences.',
    skills: [
      'Level Design',
      'Unity',
      'Unreal Engine',
      'Web Design',
      'Digital Design',
    ],
  },
  {
    name: 'Ethan Adams',
    role: 'Producer & Narrative Designer',
    specialty: 'Game Production & Interactive Storytelling',
    image: '/images/EthanAdams.png',
    color: 'from-indigo-500 to-blue-500',
    bio: 'Second-year graduate student in Interactive Media at Clark University with a minor in creative writing. Lead producer on year-long studio projects. Designs compelling narratives and characters for interactive experiences, specializing in games that explore environmental themes and the impact of player choice.',
    skills: [
      'Game Production',
      'Narrative Design',
      'Creative Writing',
      '3D Modeling & Rigging',
      'Music Composition',
      'Python',
      'C++',
      'Java',
      'C#',
      'HTML/CSS',
      'Javascript',
    ],
  },
  {
    name: 'Jared Cocomazzi',
    role: 'Narrative Designer & Game Developer',
    specialty: 'Environmental Storytelling & Player Agency',
    image: '/images/GraduateStudent.jpg',
    color: 'from-teal-500 to-green-500',
    bio: "Master's student in Interactive Media at Clark University with an interdisciplinary background in Biology and English from Union College. Creates narrative-driven games that challenge players to think deeply about their choices and real-world implications, particularly environmental themes and sustainability.",
    skills: [
      'Narrative Design',
      'Twine',
      'Python',
      'Unity',
      'Unreal Engine',
      'Environmental Storytelling',
      'Player Choice Systems',
    ],
  },
];

export default function TeamSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="team"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
            Meet Our Team
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            A multidisciplinary team of researchers, artists, and developers
            working together to explore the connections between mining and
            data-mining industries.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col"
            >
              <GlassCard className="h-full p-8 sm:p-10 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Avatar - Bigger */}
                <div className="flex justify-center mb-8">
                  {member.image ? (
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-2xl border-4 border-white/20 hover:border-white/40 transition-colors"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-6xl sm:text-7xl font-bold text-white shadow-2xl border-4 border-white/20`}
                    >
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-lg sm:text-xl font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {member.specialty}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills - Display ALL */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-xs sm:text-sm rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/40 hover:text-cyan-200 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
