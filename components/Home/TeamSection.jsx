import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GlassCard from "../UI/GlassCard";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead Researcher",
    specialty: "Data Mining Algorithms",
    avatar: "👩‍🔬",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "James Rodriguez",
    role: "Visualization Expert",
    specialty: "D3.js & Interactive Graphics",
    avatar: "👨‍💻",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Dr. Emily Watson",
    role: "Mining Industry Analyst",
    specialty: "Corporate Network Analysis",
    avatar: "👩‍💼",
    color: "from-pink-500 to-red-500",
  },
  {
    name: "Michael Park",
    role: "Full Stack Developer",
    specialty: "Next.js & System Architecture",
    avatar: "👨‍🚀",
    color: "from-green-500 to-teal-500",
  },
];

export default function TeamSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Dedicated researchers and developers working to uncover the
            connections between traditional mining and data-mining industries.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="text-center h-full">
                <div
                  className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} 
                  flex items-center justify-center text-5xl mb-6 shadow-lg`}
                >
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-accent-neon mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.specialty}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
