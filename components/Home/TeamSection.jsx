// // components/Home/TeamSection.jsx
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import GlassCard from "../UI/GlassCard";

// const teamMembers = [
//   {
//     name: "Dr. Sarah Chen",
//     role: "Lead Researcher",
//     specialty: "Data Mining Algorithms",
//     avatar: "👩‍🔬",
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     name: "James Rodriguez",
//     role: "Visualization Expert",
//     specialty: "D3.js & Interactive Graphics",
//     avatar: "👨‍💻",
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     name: "Dr. Emily Watson",
//     role: "Mining Industry Analyst",
//     specialty: "Corporate Network Analysis",
//     avatar: "👩‍💼",
//     color: "from-pink-500 to-red-500",
//   },
//   {
//     name: "Michael Park",
//     role: "Full Stack Developer",
//     specialty: "Next.js & System Architecture",
//     avatar: "👨‍🚀",
//     color: "from-green-500 to-teal-500",
//   },
// ];

// export default function TeamSection() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <section
//       id="team"
//       className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-8 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
//             Meet Our Team
//           </h2>
//           <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
//             Dedicated researchers and developers working to uncover the
//             connections between traditional mining and data-mining industries.
//           </p>
//         </motion.div>

//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
//         >
//           {teamMembers.map((member, index) => (
//             <motion.div key={index} variants={itemVariants}>
//               <GlassCard className="text-center h-full p-6">
//                 <div
//                   className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br ${member.color}
//                   flex items-center justify-center text-4xl sm:text-5xl mb-4 sm:mb-6 shadow-lg`}
//                 >
//                   {member.avatar}
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-semibold mb-2">
//                   {member.name}
//                 </h3>
//                 <p className="text-accent-neon text-sm sm:text-base mb-2">
//                   {member.role}
//                 </p>
//                 <p className="text-gray-400 text-xs sm:text-sm">
//                   {member.specialty}
//                 </p>
//               </GlassCard>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead Researcher & Data Scientist",
    specialty: "Machine Learning & Corporate Network Analysis",
    avatar: "👩‍🔬",
    color: "from-blue-500 to-cyan-500",
    bio: "Dr. Chen brings over 15 years of experience in data mining and corporate network analysis. She holds a PhD in Computer Science from MIT and has published extensively on algorithmic approaches to understanding complex business relationships. Her work bridges the gap between traditional academic research and practical applications in industry analysis.",
    achievements: [
      "Published 40+ peer-reviewed papers on network analysis",
      "Former Senior Data Scientist at Google Research",
      "Winner of the 2023 ACM Data Mining Excellence Award",
      "Keynote speaker at International Mining Analytics Conference",
    ],
    expertise: [
      "Graph Neural Networks",
      "Corporate Intelligence",
      "Predictive Analytics",
      "Research Methodology",
    ],
    education: "PhD Computer Science, MIT • MS Statistics, Stanford",
    contact: {
      email: "sarah.chen@webmining.org",
      linkedin: "linkedin.com/in/sarahchen-datascience",
      twitter: "@DrSarahChen_AI",
    },
  },
  {
    name: "James Rodriguez",
    role: "Lead Visualization Engineer",
    specialty: "Interactive Data Visualization & UI/UX Design",
    avatar: "👨‍💻",
    color: "from-purple-500 to-pink-500",
    bio: "James is a creative technologist who specializes in making complex data accessible through beautiful, interactive visualizations. With a background in both computer science and graphic design, he creates engaging digital experiences that help users understand intricate relationships in mining and data-mining industries.",
    achievements: [
      "Created award-winning D3.js visualizations for Fortune 500 companies",
      "Former Lead Designer at Uber's Data Visualization team",
      "Speaker at 20+ international design and tech conferences",
      "Open-source contributor with 10k+ GitHub stars",
    ],
    expertise: [
      "D3.js & WebGL",
      "Interactive Design",
      "Data Storytelling",
      "User Experience Research",
    ],
    education: "MS HCI, Carnegie Mellon • BA Graphic Design, Parsons",
    contact: {
      email: "james.rodriguez@webmining.org",
      portfolio: "jamesrodriguez.design",
      github: "github.com/jamesrdesign",
    },
  },
  {
    name: "Dr. Emily Watson",
    role: "Industry Research Director",
    specialty: "Mining Economics & Corporate Strategy Analysis",
    avatar: "👩‍💼",
    color: "from-pink-500 to-red-500",
    bio: "Dr. Watson is a leading expert on the global mining industry with deep knowledge of corporate structures, market dynamics, and regulatory frameworks. Her research focuses on how traditional mining companies are adapting to the digital age and forming strategic partnerships with technology firms.",
    achievements: [
      "15+ years consulting for major mining corporations",
      "Former VP of Strategic Analysis at Rio Tinto",
      "Author of 'Digital Transformation in Mining' (2024)",
      "Advisor to World Bank on sustainable mining practices",
    ],
    expertise: [
      "Mining Economics",
      "Strategic Partnerships",
      "Market Analysis",
      "Sustainability Frameworks",
    ],
    education: "PhD Economics, London School of Economics • MBA, Wharton",
    contact: {
      email: "emily.watson@webmining.org",
      linkedin: "linkedin.com/in/emilywatson-mining",
      researchgate: "researchgate.net/profile/Emily-Watson",
    },
  },
  {
    name: "Michael Park",
    role: "Full Stack Engineering Lead",
    specialty: "Web Architecture & Performance Optimization",
    avatar: "👨‍🚀",
    color: "from-green-500 to-teal-500",
    bio: "Michael is a seasoned full-stack developer who builds scalable, high-performance web applications. He leads the technical architecture for our platform, ensuring it can handle complex visualizations and large datasets while maintaining excellent user experience across all devices.",
    achievements: [
      "Built web systems serving 10M+ users at Netflix",
      "Core contributor to Next.js framework",
      "Created 5 popular open-source developer tools",
      "Technical mentor to 100+ junior developers",
    ],
    expertise: [
      "Next.js & React",
      "Node.js & Python",
      "Cloud Architecture",
      "Database Optimization",
    ],
    education:
      "BS Computer Engineering, UC Berkeley • AWS Certified Solutions Architect",
    contact: {
      email: "michael.park@webmining.org",
      github: "github.com/michaelpark-dev",
      blog: "michaelpark.dev",
    },
  },
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Handle intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    // Handle screen size detection
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 640);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScreenSize);
    }

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkScreenSize);
      }
    };
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

  const getExpertiseSlice = (expertise) => {
    const maxItems = isMobile ? 2 : 3;
    return expertise.slice(0, maxItems);
  };

  const getRemainingCount = (expertise) => {
    const maxItems = isMobile ? 2 : 3;
    return expertise.length > maxItems ? expertise.length - maxItems : 0;
  };

  return (
    <section
      id="team"
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Meet Our Research Team
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto px-4 leading-relaxed">
            Our interdisciplinary team combines expertise in data science,
            visualization design, mining industry analysis, and web development
            to create innovative research tools and insights.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div
                className="glass-panel p-4 sm:p-6 lg:p-8 text-center h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setSelectedMember(member)}
              >
                {/* Avatar */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} 
                  flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 shadow-lg 
                  transition-transform duration-300 group-hover:scale-110`}
                >
                  {member.avatar}
                </div>

                {/* Basic Info */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                  {member.name}
                </h3>
                <p className="text-accent-neon text-sm sm:text-base lg:text-lg font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base mb-4">
                  {member.specialty}
                </p>

                {/* Expertise Tags - Responsive */}
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4">
                  {getExpertiseSlice(member.expertise).map(
                    (skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 text-xs rounded-full bg-glass-white border border-glass-border"
                      >
                        {skill}
                      </span>
                    )
                  )}
                  {getRemainingCount(member.expertise) > 0 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-glass-white border border-glass-border">
                      +{getRemainingCount(member.expertise)}
                    </span>
                  )}
                </div>

                {/* Click to learn more */}
                <div className="text-xs sm:text-sm text-accent-purple opacity-70 group-hover:opacity-100 transition-opacity">
                  Click to learn more →
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Member Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#0a0f24] glass-panel rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${selectedMember.color} 
                    flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl shadow-lg flex-shrink-0`}
                  >
                    {selectedMember.avatar}
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                      {selectedMember.name}
                    </h2>
                    <p className="text-accent-neon text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                      {selectedMember.role}
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-4">
                      {selectedMember.specialty}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-300 font-medium">
                      {selectedMember.education}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl sm:text-3xl transition-colors"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {/* Bio */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-accent-neon">
                    Biography
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                    {selectedMember.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-accent-purple">
                      Key Achievements
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {selectedMember.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <span className="text-accent-neon mt-1 flex-shrink-0">
                            •
                          </span>
                          <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expertise & Contact */}
                  <div className="space-y-6">
                    {/* Expertise */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-accent-pink">
                        Areas of Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-gradient-to-r from-accent-neon/20 to-accent-purple/20 border border-accent-neon/30 text-accent-neon font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-accent-neon">
                        Connect
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(selectedMember.contact).map(
                          ([platform, contact]) => (
                            <div
                              key={platform}
                              className="flex items-center gap-3"
                            >
                              <span className="text-xs sm:text-sm font-medium text-gray-400 capitalize w-20">
                                {platform}:
                              </span>
                              <span className="text-xs sm:text-sm text-accent-neon font-mono">
                                {contact}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
