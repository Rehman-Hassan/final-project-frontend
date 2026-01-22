import { useNavigate } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          Sorry, the page you are looking for does not exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;