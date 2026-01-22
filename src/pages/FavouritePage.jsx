import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FavouritePage.css";

const FavouritePage = () => {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= GET FAVOURITES =================
  const fetchFavourites = async () => {
    try {
      if (!token) return;
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const validFavourites = res.data.filter((item) => item.product);
      setFavourites(validFavourites);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // ================= REMOVE FROM FAVOURITES =================
  const removeFavourite = async (productId) => {
    try {
      if (!token) return;

      await axios.delete(`${import.meta.env.VITE_API_URL}/favourites/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavourites((prev) =>
        prev.filter((item) => item.product?._id !== productId)
      );
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (!token) {
    return <h3 className="text-center">Please login to view favourites</h3>;
  }

  if (favourites.length === 0) {
    return <p className="text-center mt-4">No favourites added yet</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">❤️ My Favourite Products</h2>

      {/* HEADINGS (same as cart) */}
      <div className="row fw-bold border-bottom pb-2 mb-3">
        <div className="col-9">PRODUCT</div>
        <div className="col-3 text-end">ACTION</div>
      </div>

      {favourites.map((item) => (
        <div key={item._id} className="row align-items-center mb-4">

          {/* PRODUCT */}
          <div className="col-9 d-md-flex fav-product">
            <img
              src={item.product?.images?.[0] || "https://via.placeholder.com/150"}
              className="fav-img"
              alt="product"
              onClick={() =>
                item.product?._id &&
                navigate(`/product/${item.product._id}`)
              }
            />

            <div className="ms-md-3">
              <h6>{item.product?.description}</h6>
              <strong>Rs {item.product?.price}</strong>
            </div>
          </div>

          {/* ACTION */}
          <div className="col-3 text-end">
            <button
              className="btn btn-link text-danger"
              onClick={() =>
                item.product?._id && removeFavourite(item.product._id)
              }
            >
              Remove ❤️
            </button>
          </div>

          <hr className="mt-3" />
        </div>
      ))}
    </div>
  );
};

export default FavouritePage;
