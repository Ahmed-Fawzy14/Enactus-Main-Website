import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../About.module.css";

interface BoardMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image?: string;
  initials?: string;
}

const members: BoardMember[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    title: "President",
    bio: "Leads strategic direction and oversees all organizational initiatives driving impact.",
    initials: "SA",
  },
  {
    id: 2,
    name: "Omar Khaled",
    title: "Vice President",
    bio: "Partners on strategy, enabling innovation and cross-team cohesion for growth.",
    initials: "OK",
  },
  {
    id: 3,
    name: "Layla Hassan",
    title: "Operations Lead",
    bio: "Designs scalable systems and process excellence to empower our project teams.",
    initials: "LH",
  },
  {
    id: 4,
    name: "Youssef Nabil",
    title: "Finance Director",
    bio: "Ensures transparent, responsible allocation of resources and sustainable funding.",
    initials: "YN",
  },
  {
    id: 5,
    name: "Maya Farouk",
    title: "Marketing Head",
    bio: "Shapes brand narrative and outreach to amplify project visibility and engagement.",
    initials: "MF",
  },
  {
    id: 6,
    name: "Karim Said",
    title: "Projects Lead",
    bio: "Guides impact project lifecycles from ideation through measurable outcomes.",
    initials: "KS",
  },
  {
    id: 7,
    name: "Nour Adel",
    title: "HR & Talent",
    bio: "Cultivates culture, talent growth, and leadership development frameworks.",
    initials: "NA",
  },
];

interface CarouselProps {
  autoSeconds?: number; // interval before auto-slide
  pauseOnHover?: boolean; // pause when hover
  loop?: boolean; // wrap around
}

const BoardCarousel: React.FC<CarouselProps> = ({
  autoSeconds = 3, // faster default
  pauseOnHover = false,
}) => {
  // rawIndex operates on extended slides (with clones)
  const [rawIndex, setRawIndex] = useState(1); // start on first real slide
  const [index, setIndex] = useState(0); // logical index 0..count-1
  const [focused, setFocused] = useState<number | null>(null); // logical focused index
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hovering = useRef(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const skipTransitionRef = useRef(false);
  const count = members.length;
  const slidePercent = 70; // width percentage each slide occupies to allow peeking neighbors

  // Extended list for seamless loop
  const extended = [members[count - 1], ...members, members[0]];

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

  const onMouseEnter = () => {
    hovering.current = true;
    if (pauseOnHover && timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const onMouseLeave = () => {
    hovering.current = false;
    setRawIndex((r) => r);
  };

  // Seamless loop handling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleEnd = () => {
      setIsTransitioning(false); // reset transition lock
      const total = extended.length;
      if (rawIndex === total - 1) {
        // reached trailing clone
        skipTransitionRef.current = true;
        setRawIndex(1);
      } else if (rawIndex === 0) {
        // reached leading clone
        skipTransitionRef.current = true;
        setRawIndex(total - 2);
      }
    };
    track.addEventListener("transitionend", handleEnd);
    return () => track.removeEventListener("transitionend", handleEnd);
  }, [rawIndex, extended.length]);

  // Update logical and manage jump without animation
  useEffect(() => {
    syncLogical(rawIndex);
    if (skipTransitionRef.current) {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = "none";
      void track.offsetWidth; // force reflow
      track.style.transition = "";
      skipTransitionRef.current = false;
      setIsTransitioning(false); // reset after seamless jump
    }
  }, [rawIndex, syncLogical]);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-roledescription="carousel"
    >
      <div
        className={styles.slidesTrack}
        ref={trackRef}
        style={{
          transform: `translateX(calc(15% - ${rawIndex * slidePercent}%))`,
        }}
      >
        {extended.map((m, i) => {
          const logical =
            i === 0 ? count - 1 : i === extended.length - 1 ? 0 : i - 1;
          const isClone = i === 0 || i === extended.length - 1;
          const isActive = logical === index;
          return (
            <article
              key={`slide-${i}-${m.id}`}
              className={`${styles.slide} ${
                isActive ? styles.activeSlide : ""
              }`}
              aria-hidden={!isActive}
              aria-label={`${m.name} – ${logical + 1} of ${count}`}
            >
              <div
                className={`${styles.profileCard} ${
                  focused === logical ? styles.focusedCard : ""
                }`}
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
                <div className={styles.profileVisual}>
                  {m.image ? (
                    <img src={m.image} alt={m.name} />
                  ) : (
                    <span className={styles.initials}>{m.initials}</span>
                  )}
                </div>
                <div
                  className={`${styles.profileText} ${
                    focused === logical ? "" : styles.truncatedText
                  }`}
                >
                  <h3>{m.name}</h3>
                  <h4>{m.title}</h4>
                  <p>{m.bio}</p>
                  {focused === logical ? null : (
                    <div className={styles.fadeEdge} aria-hidden="true" />
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {focused === null && (
        <>
          <button
            className={`${styles.navBtn} ${styles.prev}`}
            onClick={prev}
            aria-label="Previous profile"
          >
            ‹
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={next}
            aria-label="Next profile"
          >
            ›
          </button>
          <div className={styles.dots} role="tablist">
            {members.map((m, i) => (
              <button
                key={m.id}
                className={`${styles.dot} ${
                  i === index ? styles.activeDot : ""
                }`}
                aria-label={`Show ${m.name}`}
                aria-selected={i === index}
                role="tab"
                onClick={() => goToLogical(i)}
              />
            ))}
          </div>
        </>
      )}
      {focused !== null && (
        <div
          className={styles.focusOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Profile detail"
        >
          <div className={styles.focusInner}>
            <button
              className={styles.closeBtn}
              aria-label="Close profile"
              onClick={() => setFocused(null)}
            >
              ×
            </button>
            {(() => {
              const m = members[focused];
              return (
                <div className={styles.focusContent}>
                  <div className={styles.focusImage}>
                    {m.image ? (
                      <img src={m.image} alt={m.name} />
                    ) : (
                      <span>{m.initials}</span>
                    )}
                  </div>
                  <div className={styles.focusText}>
                    <h2>{m.name}</h2>
                    <h3>{m.title}</h3>
                    <p>{m.bio}</p>
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

export default BoardCarousel;
