import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Video } from 'lucide-react';

export default function Highlight2027() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set default sound mode to unmuted
    video.muted = false;
    setIsMuted(false);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Attempt to play unmuted first
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                // If browser autoplay policy strictly requires user gesture for sound,
                // fall back gracefully to muted so the video still plays visually.
                video.muted = true;
                setIsMuted(true);
                video
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => {});
              });
          }
        } else {
          // Pause immediately when scrolled away
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if ((video as unknown as { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen) {
      (video as unknown as { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
    }
  };

  return (
    <section id="edition-2027" tabIndex={-1} className="section edition-2027-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading heading-row reveal">
          <div>
            <span className="eyebrow">
              <Video size={15} />
              2027 EDITION
            </span>
            <h2>
              The Spark of Innovation.
              <br />
              <span>Health Hackathon 2027.</span>
            </h2>
          </div>
          <p>
            Experience the vibrant collaboration, opening keynote addresses, and high-energy problem
            solving that define our global health challenge.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="edition-2027-card reveal">
          <div className="edition-2027-video-wrapper">
            <video
              ref={videoRef}
              src="/hackathon-highlights.mp4"
              poster="/hackathon-video-poster.webp"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              className="edition-2027-video"
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>

            {/* Custom Control Overlay Bar (Icon Only) */}
            <div className="edition-2027-overlay-controls">
              <div className="edition-2027-left-controls">
                <button
                  type="button"
                  className="edition-2027-ctrl-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                </button>

                <button
                  type="button"
                  className="edition-2027-ctrl-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              <button
                type="button"
                className="edition-2027-ctrl-btn"
                onClick={toggleFullScreen}
                aria-label="Full screen"
                title="Full screen"
              >
                <Maximize size={18} />
              </button>
            </div>
          </div>

          {/* Video Description Note */}
          <div className="edition-2027-info">
            <h3>Pioneering the Next Generation of Healthcare</h3>
            <p>
              Witness leadership dignitaries from VIT Bhopal & Johns Hopkins University uniting with
              brilliant minds across disciplines to pioneer life-saving technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
