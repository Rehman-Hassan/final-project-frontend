import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "../components/ProductComponents/ProductForm";
import HomeHeading from "../components/HomeHeading";

const AdminPage = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check admin status
  const isAdmin = isAuthenticated && user?.email === "rahmanhassang@gmail.com";

  const [editProduct, setEditProduct] = useState(null);

  // Check authentication and admin status
  useEffect(() => {
    if (loading) {
      return; // Still loading
    }

    console.log("AdminPage Auth Check:", {
      isAuthenticated,
      userEmail: user?.email,
      isAdmin
    });

    if (!isAuthenticated) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!isAdmin) {
      alert("Access denied. Admin access only.");
      navigate("/");
      return;
    }
  }, [loading, isAuthenticated, user, navigate, isAdmin]);

  // Check for edit query param
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      // Fetch product for editing
      axios
        .get(`${import.meta.env.VITE_API_URL}/products/${editId}`)
        .then((res) => {
          setEditProduct(res.data);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          alert("Failed to fetch product for editing");
        });
    } else {
      setEditProduct(null);
    }
  }, [searchParams]);

  const addProduct = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, data);
      console.log("Product added:", response.data);
      setEditProduct(null);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert(`Failed to add product: ${error.response?.data?.message || error.message}`);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, data);
      console.log("Product updated:", response.data);
      alert("Product updated successfully!");
      setEditProduct(null);
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      alert(`Failed to update product: ${error.response?.data?.message || error.message}`);
    }
  };
  // Show loading state
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  // Check if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container text-center mt-5">
        <h3>Please login first</h3>
      </div>
    );
  }

  // Check if user is not admin
  if (!isAdmin) {
    return (
      <div className="container text-center mt-5">
        <h3>Access Denied. Admin only.</h3>
        <p>Logged in as: {user?.email || "Unknown"}</p>
      </div>
    );
  }

  return (
    <>
      <HomeHeading>
        {editProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
      </HomeHeading>
      <div className="container my-5">
        {editProduct && (
          <button
            onClick={() => {
              setEditProduct(null);
              navigate("/admin");
            }}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "#666",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add New Product Instead
          </button>
        )}
        <ProductForm
          onProductAdd={addProduct}
          onProductUpdate={updateProduct}
          editData={editProduct}
        />
      </div>
    </>
  );
};

export default AdminPage;

