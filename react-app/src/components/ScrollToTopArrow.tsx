import { useEffect, useState } from "react";

interface Props {
  targetId?: string; // defaults to 'home'
  showAfter?: number; // pixels scrolled before showing
}

// Floating arrow button that scrolls smoothly back to target section.
export default function ScrollToTopArrow({
  targetId = "home",
  showAfter = 80,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const scrollToTarget = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTarget}
      aria-label="Back to home"
      style={{
        position: "fixed",
        right: "1.15rem",
        bottom: "1.15rem",
        width: "3.05rem",
        height: "3.05rem",
        borderRadius: "50%",
        border: "1px solid rgba(0,0,0,0.15)",
        background:
          "linear-gradient(145deg,rgba(255,255,255,0.9),rgba(250,248,243,0.85))",
        color: "#1d1a12",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.25rem",
        fontWeight: 600,
        backdropFilter: "blur(6px) saturate(160%)",
        WebkitBackdropFilter: "blur(6px) saturate(160%)",
        boxShadow:
          "0 6px 18px -8px rgba(0,0,0,0.4),0 2px 6px -2px rgba(0,0,0,0.35)",
        transition:
          "background .4s, transform .4s cubic-bezier(.16,.8,.26,1), box-shadow .4s",
        zIndex: 120,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "linear-gradient(145deg,rgba(255,255,255,1),rgba(250,248,243,0.95))";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 10px 28px -10px rgba(0,0,0,0.45),0 4px 10px -4px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          "linear-gradient(145deg,rgba(255,255,255,0.9),rgba(250,248,243,0.85))";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 18px -8px rgba(0,0,0,0.4),0 2px 6px -2px rgba(0,0,0,0.35)";
      }}
    >
      ↑
    </button>
  );
}
