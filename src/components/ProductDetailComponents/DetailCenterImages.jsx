import { useRef, useEffect, useState } from "react";
import styles from "../../styles/sideImagesContainer.module.css";

const DetailCenterImages = ({ images, selectedImage }) => {
  const imageRefs = useRef([]);
  const containerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
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

  useEffect(() => {
    // scroll to selected image
    const index = images.findIndex((img) => img === selectedImage);
    
    if (isMobile && containerRef.current) {
      // For mobile carousel, scroll horizontally
      const container = containerRef.current;
      const img = imageRefs.current[index];
      if (img) {
        const scrollPosition = img.offsetLeft - (container.offsetWidth / 2) + (img.offsetWidth / 2);
        container.scrollLeft = scrollPosition;
      }
    } else if (imageRefs.current[index]) {
      // For desktop, scroll vertically
      imageRefs.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedImage, images, isMobile]);

  // Handle touch events for swipe on mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !containerRef.current) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      // Swipe detected
      const container = containerRef.current;
      container.scrollLeft += diff > 0 ? 150 : -150;
    }

    setTouchStart(null);
  };

  return (
    <div
      className={styles.centerImageContainer}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
