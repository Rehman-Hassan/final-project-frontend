import { useRef, useEffect } from "react";
import styles from "../../styles/sideImagesContainer.module.css";

const DetailCenterImages = ({ images, selectedImage }) => {
  const imageRefs = useRef([]);

  useEffect(() => {
    // scroll to selected image
    const index = images.findIndex((img) => img === selectedImage);
    if (imageRefs.current[index]) {
      imageRefs.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedImage, images]);

  return (
    <div className={styles.centerImageContainer}>
      {images.map((img, idx) => (
        <div
          key={img + idx}
          ref={(el) => (imageRefs.current[idx] = el)}
         
        >
          <img src={img} alt={`Product ${idx}`} className={styles.centerImage} />
        </div>
      ))}
    </div>
  );
};

export default DetailCenterImages;
