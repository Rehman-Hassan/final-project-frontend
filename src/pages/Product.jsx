import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import ProductList from "../components/ProductComponents/ProductList";
import ProductLinks from "../components/ProductComponents/ProductLinks";
import HomeHeading from "../components/HomeHeading";
import NoOfProducts from "../components/ProductComponents/NoOfProducts";
import ProductSidebar from "../components/ProductComponents/ProductSidebar";

import buttonStyles from "../styles/ProductButtons.module.css";

const Product = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.email === "rahmanhassang@gmail.com";

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [gridLayout, setGridLayout] = useState(2);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [customHeading, setCustomHeading] = useState("");

  useEffect(() => {
    setMainCategory(searchParams.get("mainCategory") || "");
    setSelectedSubCategory(searchParams.get("subCategory") || "");
    setSearchQuery(searchParams.get("search") || "");
    setCustomHeading(searchParams.get("heading") || "");
  }, [searchParams]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    // Price filter
    if (p.price < priceRange.min || p.price > priceRange.max) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (p.description || "").toLowerCase().includes(q) ||
        (p.mainCategory || "").toLowerCase().includes(q) ||
        (p.subCategory || "").toLowerCase().includes(q)
      );
    }

    // Sub category filter - show all products with this subCategory (from any mainCategory)
    if (selectedSubCategory && !mainCategory) {
      return (
        (p.subCategory || "").toUpperCase() === selectedSubCategory.toUpperCase()
      );
    }

    // Sub category filter WITH main category (WINTER, SUMMER, FORMALS with specific STITCHED/UNSTITCHED/ESSEMBLES)
    if (selectedSubCategory && mainCategory) {
      return (
        (p.mainCategory || "").toUpperCase() === mainCategory.toUpperCase() &&
        (p.subCategory || "").toUpperCase() === selectedSubCategory.toUpperCase()
      );
    }

    // Main category filter (STITCHED, UNSTITCHED, SHAWLS, etc.)
    if (mainCategory) {
      return (
        (p.mainCategory || "").toUpperCase() === mainCategory.toUpperCase()
      );
    }

    return true;
  });

  const heading = customHeading
    ? customHeading
    : searchQuery
    ? `Search: "${searchQuery}"`
    : mainCategory || "ALL PRODUCTS";

  return (
    <>
      <HomeHeading>{heading}</HomeHeading>

      <ProductLinks
        mainCategory={mainCategory}
        selectedSubCategory={selectedSubCategory}
        onSelectSubCategory={(sub) =>
          navigate(`/product?mainCategory=${mainCategory}&subCategory=${sub}`)
        }
        products={products}
      />

      <NoOfProducts 
        count={filteredProducts.length}
        onGridLayoutChange={setGridLayout}
      />

      <div className="container-fluid">
        <div className="row">
          <div className={`col-lg-3 d-none d-sm-block ${buttonStyles.sidebar} ${buttonStyles.stickySidebar}`}>
            <ProductSidebar 
              products={products}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          <div className="col-lg-9">
            <ProductList
              products={filteredProducts}
              isAdmin={isAdmin}
              gridLayout={gridLayout}
              onEdit={(p) => navigate(`/admin?edit=${p._id}`)}
              onDelete={async (id) => {
                if (window.confirm("Are you sure you want to delete this product?")) {
                  try {
                    await axios.delete(
                      `${import.meta.env.VITE_API_URL}/products/${id}`
                    );
                    await getProducts();
                    alert("Product deleted successfully");
                  } catch (error) {
                    console.error(
                      "Delete error:",
                      error.response?.data || error.message
                    );
                    alert("Delete failed");
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
