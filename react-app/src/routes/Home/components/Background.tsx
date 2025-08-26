import React from "react";
import styles from "./Background.module.css";

interface BackgroundProps {
  children: React.ReactNode;
}

function Background({ children }: BackgroundProps) {
  return <div className={styles.animatedGradientBackground}>{children}</div>;
}

export default Background;
