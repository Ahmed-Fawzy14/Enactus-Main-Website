import Background from "./components/Background";
import HomeButton from "./components/Button";
import ApplyButton from "./components/Button_2";
import BrandExample from "./components/Navbar";
import styles from "./Home.module.css";

function Home() {
  return (
    <div id="home" style={{ height: "100vh" }}>
      <Background>
        <BrandExample>
          <div className={styles.centerContainer}>
            <div className={styles.mainDiv}>
              <h1 className={styles.mainText}> We Are Enactus AUC</h1>
              <div className={styles.divCenter}>
                <p className={styles.subText}>
                  Lorem ipsum dolor sit amet. Rem beatae quidem ut consectetur
                  quod aut sunt magni! Sed iste quaerat ut molestiae nihil id
                  deserunt impedit At voluptates commodi aut accusantium
                  quisquam ut eius officia. Et asperiores omnis non eligendi
                  reiciendis est internos rerum qui autem ipsa quo perspiciatis
                  amet est provident nulla.
                </p>
              </div>
              <div className={styles.divCenter}>
                <ApplyButton link="https://docs.google.com/forms/d/e/1FAIpQLScZyGNf8X-k_MbtIUfrw3HWH_d91js9IJ6xUwaTTWgd44rFbg/viewform?fbclid=PAdGRleAMac9JleHRuA2FlbQIxMQABpycw_iKBwwLFQNKG3KWwAQzs2A_pkS6Xv-fu1fezoEd3yMvVFkfrUSXDPKRI_aem_eOP3iMNaehGowmiC7LUb3Q">
                  Apply
                </ApplyButton>
                <HomeButton link="#about">About Us</HomeButton>
              </div>
            </div>
          </div>
        </BrandExample>
      </Background>
    </div>
  );
}

export default Home;
