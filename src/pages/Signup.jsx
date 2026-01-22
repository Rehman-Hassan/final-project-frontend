import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { FiMail, FiUser, FiMapPin, FiHome, FiPhone, FiLock } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { IoMdCheckboxOutline } from "react-icons/io";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    name: "",
    country: "Pakistan",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    password: "",
    marketingEmail: false,
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(form));
    if (res.payload?.success) navigate("/");
  };

  return (
    <div className="SignUp-container">
      <h2>Create Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div className="input-wrapper">
          <FiMail className="input-icon" />
          <input name="email" placeholder="Email" className="input" required onChange={handleChange} />
        </div>

        <div className="input-wrapper">
          <FiUser className="input-icon" />
          <input name="name" placeholder="Full Name" className="input" required onChange={handleChange} />
        </div>

        <div className="input-wrapper">
          <FiMapPin className="input-icon" />
          <select name="country" onChange={handleChange} className="input">
            <option>Pakistan</option>
          </select>
        </div>

        <div className="input-wrapper">
          <FiHome className="input-icon" />
          <input name="address" placeholder="Address" className="input" required onChange={handleChange} />
        </div>

        <div className="input-wrapper">
          <BsBuilding className="input-icon" />
          <input name="apartment" placeholder="Apartment (optional)" className="input" onChange={handleChange} />
        </div>

        <div className="input-wrapper">
          <FiMapPin className="input-icon" />
          <input name="city" placeholder="City" className="input" required onChange={handleChange} />
        </div>

        <div className="input-wrapper">
          <FiMapPin className="input-icon" />
          <input name="postalCode" placeholder="Postal Code (optional)" className="input" onChange={handleChange} />
        </div>

        <div className="input-wrapper">
          <FiPhone className="input-icon" />
          <input name="phone" placeholder="Phone" className="input" required onChange={handleChange} />
        </div>

        <div className="input-wrapper">
          <FiLock className="input-icon" />
          <input type="password" name="password" placeholder="Password" className="input" required onChange={handleChange} />
        </div>

        <label className="checkbox input">
          <input type="checkbox" name="marketingEmail"  onChange={handleChange} />
          <IoMdCheckboxOutline className="checkbox-icon " />
          Email me with news and offers
        </label>

        <button type="submit" id="pay-now" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
