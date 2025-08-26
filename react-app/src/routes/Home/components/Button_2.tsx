import styles from "./Button.module.css";

interface homeButtonText {
  children: React.ReactNode;
  link: string;
}

function ApplyButton({ children, link }: homeButtonText) {
  return (
    <>
      <button
        className={`${styles.buttonWrapperTransparent} ${styles.mainText}`}
        onClick={() => {
          window.open(link, "_blank");
          console.log("Clicked");
        }}
      >
        {children}
      </button>
    </>
  );
}

export default ApplyButton;
