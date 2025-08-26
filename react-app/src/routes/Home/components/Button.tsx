import styles from "./Button.module.css";

interface homeButtonText {
  children: React.ReactNode;
  link: string;
}

function HomeButton({ children, link }: homeButtonText) {
  const handleClick = () => {
    if (link.startsWith("#")) {
      const id = link.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // fallback to external/new tab if not an internal hash
    window.open(link, "_blank");
  };
  return (
    <button
      className={`${styles.buttonWrapper} ${styles.mainText}`}
      onClick={handleClick}
      aria-label={typeof children === "string" ? children : "Home button"}
    >
      {children}
    </button>
  );
}

export default HomeButton;
