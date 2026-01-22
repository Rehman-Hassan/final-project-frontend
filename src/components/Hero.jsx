import styles from '../styles/Hero.module.css'
const Hero = () => {
  const handleLiveNowClick = () => {
    alert("No live items yet");
  };

  return (
    <div className={styles.hero}>
      <button type="button" className={styles.shopNow} onClick={handleLiveNowClick}>LIVE NOW</button>
    </div>
  )
}

export default Hero