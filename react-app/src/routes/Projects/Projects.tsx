import ScrollToTopArrow from "../../components/ScrollToTopArrow";
import ImageCarousel from "./components/ImageCarousel";
import styles from "./Projects.module.css";

function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.leftContent}>
        <h1 className={styles.title}>Impactful Projects</h1>

        <div className={styles.copyWrap}>
          <h2 className={styles.header}>Innovation In Action</h2>
          <h3 className={styles.subheading}>
            Sustainable Solutions. Measurable Impact.
          </h3>

          <p className={styles.paragraph}>
            We design and deliver purpose‑driven initiatives that solve real
            problems for real people. Each project blends entrepreneurship,
            sustainability and local insight to create practical change—not just
            presentations or prototypes.
          </p>

          <p className={styles.paragraph}>
            Partnering with communities, educators, businesses and civic
            stakeholders lets us scale ideas responsibly. The result: improved
            livelihoods, expanded learning opportunities and inclusive economic
            growth where it’s needed most.
          </p>

          <p className={styles.paragraph}>
            We measure success by durability. Strategies are built to keep
            working after the spotlight fades—embedding skills, ownership and
            resilience so impact compounds year after year.
          </p>
        </div>
      </div>

      <div className={styles.rightContent}>
        <ImageCarousel autoSeconds={4} pauseOnHover={true} />
      </div>

      <ScrollToTopArrow />
    </section>
  );
}

export default Projects;
