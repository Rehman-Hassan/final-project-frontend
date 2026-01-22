// src/pages/Checkout.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CheckOut.css";

const Checkout = () => {
  const { token } = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [token]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product?.price * item.quantity,
    0
  );
  const tax = 100;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    try {
      // ✅ Just call backend checkout endpoint
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/checkout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order placed successfully!");
      navigate("/"); // redirect after order
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order");
    }
  };

  if (!token)
    return <h3 className="text-center mt-5">Please login to view checkout</h3>;
  if (cart.length === 0)
    return <p className="text-center mt-5">Your cart is empty</p>;

  return (
    <div className="checkout-container">
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="checkout-grid">
        <div className="checkout-items">
          {cart.map((item) => (
            <div key={item._id} className="checkout-item">
              <img
                src={item.product?.images?.[0] || "https://via.placeholder.com/150"}
                alt="product"
              />
              <div className="item-details">
                <h5>{item.product?.description}</h5>
                <p>Size: {item.size}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: Rs {item.product?.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h4>Order Summary</h4>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>Rs {tax}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>

          <button className="complete-order-btn" onClick={handleCheckout}>
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
