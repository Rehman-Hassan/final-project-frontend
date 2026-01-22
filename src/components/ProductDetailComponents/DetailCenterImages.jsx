import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../../styles/sideImagesContainer.module.css";

const DetailCenterImages = ({ images, selectedImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update index when selectedImage changes
  useEffect(() => {
    const index = images.findIndex((img) => img === selectedImage);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedImage, images]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (isMobile) {
    return (
      <div className={styles.carouselWrapper}>
        <button className={styles.arrowBtn} onClick={handlePrevious}>
          <FiChevronLeft size={24} />
        </button>

        <div className={styles.carouselContainer}>
          <img
            src={images[currentIndex]}
            alt={`Product ${currentIndex}`}
            className={styles.carouselImage}
          />
        </div>

        <button className={styles.arrowBtn} onClick={handleNext}>
          <FiChevronRight size={24} />
        </button>

        {/* Image counter */}
        <div className={styles.imageCounter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    );
  }

  // Desktop view - show all images vertically
  return (
    <div className={styles.centerImageContainer}>
      {images.map((img, idx) => (
        <img
          key={img + idx}
          src={img}
          alt={`Product ${idx}`}
          className={styles.centerImage}
        />
      ))}
    </div>
  );
};

export default DetailCenterImages;
