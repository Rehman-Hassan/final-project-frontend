import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

import styles from "../../styles/RelatedProducts.module.css";

const RelatedProducts = ({ mainCategory, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);

        const filtered = res.data
          .filter(
            (p) => p.mainCategory === mainCategory && p._id !== currentProductId
          )
          .slice(0, 4);

        setProducts(filtered);
      } catch (err) {
        console.error("Related products error", err);
      }
    };

    fetchRelated();
  }, [mainCategory, currentProductId]);

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

  if (!products.length) return null;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Related Products</h3>

      <div className={styles.grid}>
        {products.map((item) => {
          const isFav = favourites.includes(item._id);

          return (
            <div key={item._id} className={styles.card}>
              {/* ❤️ Favourite */}
              <button
                className={`${styles.heartWrapper} ${
                  isFav ? styles.activeHeart : ""
                }`}
                onClick={() => handleFavourite(item._id)}
              >
                <FaHeart className={styles.heartIcon} />
              </button>

              <img
                src={item.images?.[0] || "https://via.placeholder.com/300"}
                alt={item.description}
                onClick={() => navigate(`/product/${item._id}`)}
                className={styles.image}
              />

              <div className={styles.info}>
                <p>{item.description}</p>
                <span>{item.category}</span>
                <strong>Rs {item.price}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
