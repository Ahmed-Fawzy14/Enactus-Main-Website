import React from "react";
import styles from "./Background.module.css";

interface BackgroundProps {
  children: React.ReactNode;
}

function Background({ children }: BackgroundProps) {
  return (
    <div className={styles.animatedGradientBackground}>
      <span className={styles.blob} />
      <span className={styles.blob} />
      <span className={styles.blob} />
      <span className={styles.blob} />
      <span className={styles.blob} />
      <span className={styles.blob} />
      <span className={styles.blob} />
      <span className={styles.blob} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Background;
