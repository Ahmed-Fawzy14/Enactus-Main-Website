import styles from "./Button.module.css";

interface homeButtonText {
  children: React.ReactNode;
  link: string;
}

function HomeButton({ children, link }: homeButtonText) {
  return (
    <>
      <button
        className={`${styles.buttonWrapper} ${styles.mainText}`}
        onClick={() => window.open(link, "_blank")}
      >
        {children}
      </button>
    </>
  );
}

export default HomeButton;
