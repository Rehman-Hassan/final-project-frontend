import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaInfoCircle,
  FaTruck,
  FaClipboardList,
  FaUndoAlt,
  FaTshirt,
} from "react-icons/fa";

import styles from "../../styles/ImageDetails.module.css";

const ImageDetails = ({ product, navigate }) => {
  const { token } = useSelector((state) => state.auth);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const addToCart = async () => {
    if (!token) return alert("Login required");
    
    // Size is required for STITCHED, UNSTITCHED, and ESSEMBLES products
    const isSizedProduct = product.mainCategory === "STITCHED" || product.mainCategory === "UNSTITCHED" || product.mainCategory === "ESSEMBLES";
    if (isSizedProduct && !size) {
      return alert("Select size");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          product: product._id,
          size: size || "", // Send empty string if no size selected (for SHAWLS, DUPATTAS, etc.)
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Added to cart");
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className={styles.imageDetailsContainer}>
      <p className={styles.dressDescription}>{product.description}</p>
      <p className={styles.dressPrice}>PKR {product.price}</p>
      <hr />

      {/* Sizes - For STITCHED, UNSTITCHED, and ESSEMBLES */}
      {(product.mainCategory === "STITCHED" || product.mainCategory === "UNSTITCHED" || product.mainCategory === "ESSEMBLES") && (
        <div className={styles.sizeContainer}>
          {product.sizes?.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`${styles.sizeBtn} ${size === s ? styles.active : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Main Category Display */}
      <div className={styles.mainCategoryContainer}>
        <p className={styles.mainCategoryLabel}>
          <FaTshirt className={styles.categoryIcon} /> 
          <strong>Type:</strong> {product.mainCategory}
        </p>
      </div>

      {/* Quantity */}
      <div className={styles.qtyContainer}>
        <button
          onClick={() => setQty((q) => Math.max(q - 1, 1))}
          className={styles.qtyBtn}
        >
          -
        </button>
        <span className={styles.qtyNumber}>{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className={styles.qtyBtn}
        >
          +
        </button>
      </div>

      <button onClick={addToCart} className={styles.addToCartBtn}>
        Add to Cart
      </button>

      {/* 🔽 Product Details Section */}
      <div className={styles.accordion}>

        <details className={styles.detailBox}>
          <summary>
            <FaInfoCircle className={styles.icon} />
            PRODUCT DETAILS
          </summary>
          <p>
            <strong>Note:</strong> DIGITAL PRINTED DUPATA AND SHIRT ONE PIECE
          </p>
        </details>

        <details className={styles.detailBox}>
          <summary>
            <FaTruck className={styles.icon} />
            DELIVERY
          </summary>
          <p>WITHIN TWO WEEKS</p>
        </details>

        <details className={styles.detailBox}>
          <summary>
            <FaClipboardList className={styles.icon} />
            DESCRIPTION
          </summary>
          <p>
            Introducing EMBROIDERED NET SF, a stunning three-piece ensemble that
            celebrates intricate craftsmanship. This collection features
            meticulously embroidered net for the front and back body,
            complemented by detailed panels and elegant sleeves.
          </p>
        </details>

        <details className={styles.detailBox}>
          <summary>
            <FaUndoAlt className={styles.icon} />
            RETURNS & EXCHANGE
          </summary>
          <p>
            We offer a 10-days exchange policy starting from the date of order
            delivery. Any damaged or missing item must be reported within 48
            hours.
          </p>
        </details>

        <details className={styles.detailBox}>
          <summary>
            <FaTshirt className={styles.icon} />
            CARE INSTRUCTIONS
          </summary>
          <p>
            Dry clean recommended. Iron at moderate temperature. Do not use
            bleach. Slight color variation may occur. Fabric only for unstitched
            articles.
          </p>
        </details>

      </div>
    </div>
  );
};

export default ImageDetails;
