import styles from "../../styles/sideImagesContainer.module.css";

const DetailSideImages = ({ images, onSelectImage, selectedImage }) => {
  return (
    <div className={styles.sideImagesWrapper}>
      {images.map((img, idx) => (
        <div
          key={img + idx}
          className={`${styles.sideImageContainer} ${
            selectedImage === img ? styles.activeSide : ""
          }`}
          onClick={() => onSelectImage(img)}
        >
          <img src={img} alt={`Side ${idx}`} className={styles.sideImage} />
        </div>
      ))}
    </div>
  );
};

export default DetailSideImages;
