import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../Projects.module.css";

interface ProjectImage {
  id: number;
  title: string;
  image?: string;
  video?: string;
}

const projectImages: ProjectImage[] = [
  { id: 1, title: "Project Alpha" },
  { id: 2, title: "Project Beta" },
  { id: 3, title: "Project Gamma" },
  { id: 4, title: "Project Delta" },
  { id: 5, title: "Project Epsilon" },
  { id: 6, title: "Project Zeta" },
  { id: 7, title: "Project Eta" },
  { id: 8, title: "Project Theta" },
  { id: 9, title: "Project Iota" },
  { id: 10, title: "Project Kappa" },
];

interface ImageCarouselProps {
  autoSeconds?: number;
  pauseOnHover?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  autoSeconds = 4,
  pauseOnHover = true,
}) => {
  const [rawIndex, setRawIndex] = useState(1);
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hovering = useRef(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const skipTransitionRef = useRef(false);
  const count = projectImages.length;
  // Dynamically derive slide percent from computed flex-basis so CSS breakpoints (different flex-basis values) stay in sync
  const [slidePercent, setSlidePercent] = useState(72);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const recalcSlidePercent = useCallback(() => {
    try {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      const firstSlide = track.querySelector(
        `.${styles.imageSlide}`
      ) as HTMLElement | null;
      if (!firstSlide) return;
      const basis = window.getComputedStyle(firstSlide).flexBasis;
      let pct = 72;
      if (basis.endsWith("%")) {
        const parsed = parseFloat(basis);
        if (!Number.isNaN(parsed) && parsed > 10 && parsed < 100) pct = parsed;
      } else {
        // fallback compute via element width vs container width
        const slideRect = firstSlide.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        if (contRect.width > 0) {
          const computed = (slideRect.width / contRect.width) * 100;
          if (computed > 10 && computed < 100)
            pct = parseFloat(computed.toFixed(2));
        }
      }
      setSlidePercent(pct);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    recalcSlidePercent();
    const handle = () => recalcSlidePercent();
    window.addEventListener("resize", handle);
    // Recalculate after fonts/images load (layout shifts)
    const id = window.setTimeout(recalcSlidePercent, 300);
    return () => {
      window.removeEventListener("resize", handle);
      window.clearTimeout(id);
    };
  }, [recalcSlidePercent]);

  // Side padding percentage (space left/right to create peek of adjacent slides)
  const sidePadPercent = (100 - slidePercent) / 2;

  // Extended list for seamless loop
  const extended = [
    projectImages[count - 1],
    ...projectImages,
    projectImages[0],
  ];

  const syncLogical = useCallback(
    (ri: number) => {
      let logical = ri - 1;
      if (logical < 0) logical = count - 1;
      if (logical >= count) logical = 0;
      setIndex(logical);
    },
    [count]
  );

  const goToLogical = useCallback((logical: number) => {
    setRawIndex(logical + 1);
    setIndex(logical);
  }, []);

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setRawIndex((r) => r + 1);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setRawIndex((r) => r - 1);
  }, [isTransitioning]);

  useEffect(() => {
    if (focused !== null) return; // pause while focused
    if (autoSeconds <= 0) return;
    if (pauseOnHover && hovering.current) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => next(), autoSeconds * 1000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [rawIndex, autoSeconds, pauseOnHover, next, focused]);

  // Pause when tab hidden, resume when visible
  useEffect(() => {
    const handleVis = () => {
      if (document.hidden) {
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else {
        if (!hovering.current && focused === null && autoSeconds > 0) {
          if (timerRef.current) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(
            () => next(),
            autoSeconds * 1000
          );
        }
      }
    };
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, [autoSeconds, next, focused]);

  const onMouseEnter = () => {
    hovering.current = true;
    if (pauseOnHover && timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const onMouseLeave = () => {
    hovering.current = false;
    // Explicitly restart autoplay since rawIndex may not change (no state update -> effect won't rerun)
    if (pauseOnHover && autoSeconds > 0 && focused === null) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => next(), autoSeconds * 1000);
    }
  };

  // Seamless loop handling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleEnd = () => {
      setIsTransitioning(false); // reset transition lock
      const total = extended.length;
      if (rawIndex === total - 1) {
        skipTransitionRef.current = true;
        setRawIndex(1);
      } else if (rawIndex === 0) {
        skipTransitionRef.current = true;
        setRawIndex(total - 2);
      }
    };
    track.addEventListener("transitionend", handleEnd);
    return () => track.removeEventListener("transitionend", handleEnd);
  }, [rawIndex, extended.length]);

  useEffect(() => {
    syncLogical(rawIndex);
    if (skipTransitionRef.current) {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = "none";
      void track.offsetWidth;
      track.style.transition = "";
      skipTransitionRef.current = false;
      setIsTransitioning(false); // reset after seamless jump
    }
  }, [rawIndex, syncLogical]);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (focused !== null) {
        if (e.key === "Escape") setFocused(null);
        return;
      }
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [next, prev, focused]);

  return (
    <div
      className={styles.imageCarousel}
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-roledescription="image carousel"
    >
      <div className={styles.imageViewport}>
        <div
          className={styles.imageTrack}
          ref={trackRef}
          style={{
            transform: `translateX(calc(${sidePadPercent}% - ${
              (rawIndex - 1) * slidePercent
            }%))`,
          }}
        >
          {extended.map((project, i) => {
            const logical =
              i === 0 ? count - 1 : i === extended.length - 1 ? 0 : i - 1;
            const isClone = i === 0 || i === extended.length - 1;

            return (
              <div
                key={`slide-${i}-${project.id}`}
                className={styles.imageSlide}
              >
                <div
                  className={styles.imageCard}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (!isClone) setFocused(logical);
                  }}
                  onKeyDown={(e) => {
                    if (isClone) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFocused(logical);
                    }
                  }}
                  style={isClone ? { pointerEvents: "none" } : undefined}
                >
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : project.video ? (
                    <video src={project.video} controls />
                  ) : (
                    <div className={styles.placeholder}>{project.id}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className={`${styles.imageNavBtn} ${styles.imagePrev}`}
        onClick={prev}
        aria-label="Previous project"
      >
        ‹
      </button>
      <button
        className={`${styles.imageNavBtn} ${styles.imageNext}`}
        onClick={next}
        aria-label="Next project"
      >
        ›
      </button>

      <div className={styles.imageDots}>
        {projectImages.map((project, i) => (
          <button
            key={project.id}
            className={`${styles.imageDot} ${
              i === index ? styles.activeImageDot : ""
            }`}
            aria-label={`Show ${project.title}`}
            onClick={() => goToLogical(i)}
          />
        ))}
      </div>

      {focused !== null && (
        <div
          className={styles.focusOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Project detail"
        >
          <div className={styles.focusInner}>
            <button
              className={styles.closeBtn}
              aria-label="Close project"
              onClick={() => setFocused(null)}
            >
              ×
            </button>
            {(() => {
              const project = projectImages[focused];
              return (
                <div className={styles.focusContent}>
                  <div className={styles.focusImage}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : project.video ? (
                      <video src={project.video} controls />
                    ) : (
                      <div className={styles.placeholder}>{project.id}</div>
                    )}
                  </div>
                  <div className={styles.focusText}>
                    <h2>{project.title}</h2>
                    <p>
                      Detailed information about this project would go here.
                      This is where you can showcase the impact, methodology,
                      and outcomes of each initiative.
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
