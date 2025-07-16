import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              Web-Development-Mining
            </h3>
            <p className="text-gray-400 max-w-md">
              Interactive research platform exploring the connections between
              mining and data-mining industries through visualization and
              gamification.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/visualizations"
                  className="text-gray-400 hover:text-accent-neon transition-colors"
                >
                  Visualizations
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="text-gray-400 hover:text-accent-neon transition-colors"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  href="/data"
                  className="text-gray-400 hover:text-accent-neon transition-colors"
                >
                  Data Repository
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Technologies</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Next.js</li>
              <li>D3.js</li>
              <li>Tailwind CSS</li>
              <li>Vercel</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-glass-border text-center text-gray-400">
          <p>&copy; 2025 Web-Development-Mining. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with cutting-edge web technologies for academic research.
          </p>
        </div>
      </div>
    </footer>
  );
}
