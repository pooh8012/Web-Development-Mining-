import { useState } from "react";

export default function GameEmbed({ game }) {
  const [blocked, setBlocked] = useState(false);

  if (game.type === "html" && game?.html?.path) {
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
        <iframe
          src={game.html.path} // "/games/gaia/index.html"
          className="h-full w-full"
          title={game.title}
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (game.type === "itch" && game?.itch) {
    return (
      <div>
        {game.itch.embedUrl && !blocked ? (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
            <iframe
              src={game.itch.embedUrl}
              className="h-full w-full"
              title={game.title}
              allowFullScreen
              loading="lazy"
              onError={() => setBlocked(true)}
            />
          </div>
        ) : null}

        {(!game.itch.embedUrl || blocked) && (
          <div className="mt-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6 text-cyan-100">
            The embedded view isn’t available.
            <a
              href={game.itch.pageUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center rounded-xl px-3 py-2 font-semibold ring-1 ring-inset ring-cyan-500/40 hover:bg-cyan-500/20"
            >
              Open on itch.io ↗
            </a>
          </div>
        )}
      </div>
    );
  }

  return null;
}
