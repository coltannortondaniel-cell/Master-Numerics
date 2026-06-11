import { useState } from "react";
import type { VideoRef } from "../../../lib/physics";

/**
 * Lazy YouTube facade — shows the thumbnail until clicked, then swaps in the
 * IFrame player. Keeps the lesson fast (no embeds load up front).
 */
function VideoCard({ video }: { video: VideoRef }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-neutron/10 bg-space/50">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play ${video.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-space/30 transition-colors group-hover:bg-space/10" />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-alert/90 shadow-glow transition-transform group-hover:scale-110">
              <span className="ml-1 border-y-8 border-l-[14px] border-y-transparent border-l-white" />
            </span>
          </button>
        )}
      </div>
      <p className="px-4 py-3 text-sm text-neutron/75">{video.title}</p>
    </div>
  );
}

export function VideoSection({ title, videos }: { title?: string | null; videos: VideoRef[] }) {
  return (
    <section className="glass px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-alert">
        Watch & wonder
      </p>
      {title && <h3 className="mb-4 font-display text-2xl font-bold">{title}</h3>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((v) => (
          <VideoCard key={v.youtubeId} video={v} />
        ))}
      </div>
    </section>
  );
}
