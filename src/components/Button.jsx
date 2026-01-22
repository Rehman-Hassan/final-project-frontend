import styles from '../styles/Button.module.css';

const Button = () => {
 

  return (
    <>
      {BtnName.map((name, index) => (
        <button key={index} className={styles.shopNow}>
          {name}
        </button>
      ))}
    </>
  );
};

export default Button;
