import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border mt-16 sm:mt-24 lg:mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-display font-bold gradient-text mb-3 sm:mb-4">
              Web-Development-Mining
            </h3>
            <p className="text-sm sm:text-base text-gray-400 max-w-md">
              Interactive research platform exploring the connections between
              mining and data-mining industries through visualization and
              gamification.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/visualizations"
                  className="text-gray-400 hover:text-accent-neon transition-colors text-sm sm:text-base"
                >
                  Visualizations
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="text-gray-400 hover:text-accent-neon transition-colors text-sm sm:text-base"
                >
                  Games
                </Link>
              </li>
              <li>
                {/* <Link
                  href="/About"
                  className="text-gray-400 hover:text-accent-neon transition-colors text-sm sm:text-base"
                >
                  Home
                </Link> */}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Technologies
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>Next.js</li>
              <li>D3.js</li>
              <li>Tailwind CSS</li>
              <li>Vercel</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-glass-border text-center text-gray-400">
          <p className="text-sm sm:text-base">
            &copy; 2025 Web-Development-Mining. All rights reserved.
          </p>
          <p className="mt-2 text-xs sm:text-sm">
            Built with cutting-edge web technologies for academic research.
          </p>
        </div>
      </div>
    </footer>
  );
}
