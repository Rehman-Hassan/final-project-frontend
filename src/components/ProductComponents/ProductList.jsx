import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

import styles from "../../styles/ProductList.module.css";
import buttonStyles from "../../styles/ProductButtons.module.css";

const ProductList = ({ products = [], isAdmin, gridLayout = 2, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [favourites, setFavourites] = useState([]);

  const handleFavourite = async (productId) => {
    if (!token) {
      alert("Login required");
      return;
    }

    if (favourites.includes(productId)) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/favourites`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFavourites((prev) => [...prev, productId]);
    } catch (err) {
      console.error("Favourite error", err);
    }
  };

  const getGridClass = () => {
    switch (gridLayout) {
      case 2:
        return styles.grid2;
      case 3:
        return styles.grid3;
      case 4:
        return styles.grid4;
      default:
        return styles.grid2;
    }
  };

  return (
    <div className={styles.productContainer}>
      <div className={`${styles.productGrid} ${getGridClass()}`}>
        {products.map((item) => {
          const isFav = favourites.includes(item._id);

          return (
            <div key={item._id} className={styles.productCard}>
              {/* ❤️ Favourite */}
              <button
                className={`${styles.heartWrapper} ${
                  isFav ? styles.activeHeart : ""
                }`}
                onClick={() => handleFavourite(item._id)}
              >
                <FaHeart className={styles.heartIcon} />
              </button>

              {/* Image */}
              <img
                src={
                  item.images && item.images.length > 0
                    ? item.images[item.mainImageIndex || 0]
                    : "https://via.placeholder.com/300"
                }
                alt={item.description}
                className={styles.productImage}
                onClick={() => navigate(`/product/${item._id}`)}
              />

              <div className={styles.paraContainer}>
                <span>{item.description}</span>
                <span>{item.category}</span>
                <strong>Rs {item.price}</strong>

                {isAdmin && (
                  <div className={buttonStyles.actionGroup}>
                    <button
                      onClick={() => onEdit(item)}
                      className={buttonStyles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className={buttonStyles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
