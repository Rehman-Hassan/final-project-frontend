import styles from '../styles/Marquee.module.css';

const Marquee = () => {
  return (
    <div className={`${styles.marqueeDiv} py-2`}>
      <marquee>
        <span className={styles.international}>
          FOR INTERNATION WEBSITE VISIT{" "}
          <a href="https://baroque.pk/?country=PK">
            WWW.BAROQUE.COM.PK
          </a>
        </span>

        <span className={styles.call}>
          CALL US AT: UAN 111-302-302
        </span>

        <span className={styles.international}>
          FOR INTERNATION WEBSITE VISIT{" "}
          <a href="https://baroque.pk/?country=PK">
            WWW.BAROQUE.COM.PK
          </a>
        </span>

        <span className={styles.call}>
          CALL US AT: UAN 111-302-302
        </span>
      </marquee>
    </div>
  );
};

export default Marquee;
