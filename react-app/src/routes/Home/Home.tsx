import Background from "./components/Background";
import HomeButton from "./components/Button";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <Background>
        <div className={styles.centerContainer}>
          <div className={styles.mainDiv}>
            <h1 className={styles.mainText}> We Are Enactus AUC</h1>
            <div className={styles.divCenter}>
              <p className={styles.subText}>
                Lorem ipsum dolor sit amet. Rem beatae quidem ut consectetur
                quod aut sunt magni! Sed iste quaerat ut molestiae nihil id
                deserunt impedit At voluptates commodi aut accusantium quisquam
                ut eius officia. Et asperiores omnis non eligendi reiciendis est
                internos rerum qui autem ipsa quo perspiciatis amet est
                provident nulla.
              </p>
            </div>
            <div className={styles.divCenter}>
              <HomeButton link="https://www.google.com">Apply</HomeButton>
              <HomeButton link="https://www.google.com">About Us</HomeButton>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
}

export default Home;
