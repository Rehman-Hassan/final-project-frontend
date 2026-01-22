import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // ✅ Added this

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  if (!token) return <h3 className="text-center">Please login to view cart</h3>;
  if (cart.length === 0)
    return <p className="text-center mt-4">Your cart is empty</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 mt-4">Cart</h2>
      <p className="cartEligibility mb-5">
        YOU ARE ELIGIBLE FOR FREE SHIPPING
      </p>

      {/* headings */}
      <div className="row fw-bold border-bottom pb-2 mb-3">
        <div className="col-6">PRODUCT</div>
        <div className="col-3 text-center">QUANTITY</div>
        <div className="col-3 text-end">TOTAL</div>
      </div>

      {cart.map((item) => (
        <div key={item._id} className="row align-items-center mb-4">
          {/* PRODUCT */}
          <div className="col-6 d-md-flex">
            <img
              src={item.product?.images?.[0] || "https://via.placeholder.com/150"}
              className="cart-img"
              alt="product"
            />
            <div className="ms-md-3">
              <h6>{item.product?.description}</h6>
              <p className="mb-1">Size: {item.size}</p>
              <strong>Rs {item.product?.price}</strong>
            </div>
          </div>

          {/* QUANTITY */}
          <div className="col-3 text-center">
            <div className="qty-box">
              <button onClick={() => updateQty(item._id, "dec")}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQty(item._id, "inc")}>+</button>
            </div>

            <button
              className="btn btn-link text-danger mt-2"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </button>
          </div>

          {/* TOTAL */}
          <div className="col-3 text-end fw-bold">
            Rs {item.product?.price * item.quantity}
          </div>
          <hr className="mt-3" />
        </div>
      ))}

      <div className="row">
        <div className="col-12 text-end fw-bold fs-5">
          Total: Rs{" "}
          {cart.reduce(
            (acc, item) => acc + item.product?.price * item.quantity,
            0
          )}
        </div>
        <div
          className="col-12 text-end mt-2"
          style={{ color: "gray", fontSize: "14px" }}
        >
          TAX INCLUDED SHIPPING CALCULATED AT CHECKOUT
        </div>

        {/* ✅ Fixed div typo */}
        <div className="col-12 text-end mt-4">
          <button
            className="checkOutBtn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
