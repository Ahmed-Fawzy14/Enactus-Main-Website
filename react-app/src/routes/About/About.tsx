import ScrollToTopArrow from "../../components/ScrollToTopArrow";
import BoardCarousel from "./components/BoardCarousel";
import styles from "./About.module.css";

function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.introText}>
        Meet our upper board: a multidisciplinary team committed to sustainable
        social impact, innovation, and empowering student leadership. Their
        combined expertise drives strategic growth and community outcomes.
      </p>
      <BoardCarousel />
      <ScrollToTopArrow />
    </section>
  );
}

export default About;
