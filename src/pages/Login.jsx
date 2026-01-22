import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.payload?.success) navigate("/");
  };

  return (
    <div className="p-5" style={{ maxWidth: "400px", margin: "0 auto", backgroundColor:"bisque" }}>
      <h2 className="text-center py-3">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="input mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          autoComplete="email"
          required
        />

        <input
          type="password"
          className="input mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="current-password"
          required
        />

        <button id="pay-now" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-3">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "black", textDecoration: "underline" }}>
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
