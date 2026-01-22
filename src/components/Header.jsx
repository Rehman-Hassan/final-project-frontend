

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useCart } from "../context/CartContext";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const cartContext = useCart();
  const cart = cartContext?.cart || [];
  
  // Check if admin - more robust check (case-insensitive, trimmed)
  const isAdmin = isAuthenticated && user?.email?.toLowerCase().trim() === "rahmanhassang@gmail.com";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchOpen && !e.target.closest('.search-wrapper')) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdown(false);
    navigate("/");
  };

  return (
    <>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>

          <div className="sidebar-menu">
            {/* Admin Link - Top of sidebar */}
            {isAdmin && (
              <a 
                onClick={() => { 
                  navigate("/admin"); 
                  setSidebarOpen(false); 
                }}
                style={{ 
                  color: "#4CAF50", 
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "block",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd",
                  marginBottom: "10px"
                }}
              >
                ➕ Add Product (Admin)
              </a>
            )}
            
            {/* Category Links */}
            <a onClick={() => { navigate("/product?mainCategory=STITCHED"); setSidebarOpen(false); }}>Stitched</a>
            <a onClick={() => { navigate("/product?mainCategory=UNSTITCHED"); setSidebarOpen(false); }}>Unstitched</a>
            <a onClick={() => { navigate("/product?mainCategory=SHAWLS"); setSidebarOpen(false); }}>Shawls</a>
            <a onClick={() => { navigate("/product?mainCategory=ESSEMBLES"); setSidebarOpen(false); }}>Essembles</a>
            <a onClick={() => { navigate("/product?mainCategory=DUPATTAS"); setSidebarOpen(false); }}>Dupattas</a>
            <a onClick={() => { navigate("/product?mainCategory=FORMALS"); setSidebarOpen(false); }}>Formals</a>
            <a onClick={() => { navigate("/product?mainCategory=SUMMER"); setSidebarOpen(false); }}>Summer</a>
            <a onClick={() => { navigate("/product?mainCategory=VELVET"); setSidebarOpen(false); }}>Velvet</a>
            <a onClick={() => { navigate("/product?mainCategory=WINTER"); setSidebarOpen(false); }}>Winter</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <div className="logo" onClick={() => navigate("/")}>
            <img
              src="https://baroque.pk/cdn/shop/files/LOGO_PNG_white_v01.png"
              alt="Baroque"
            />
          </div>

          {/* Right Icons */}
          <div className="header-right">
            {/* Country Dropdown */}
            <div className="country-dropdown-wrapper">
              <button className="country-dropdown">
                <span>Pakistan</span>
                <MdKeyboardArrowDown size={16} />
              </button>
              <div className="country-menu">
                <a>Pakistan</a>
                <a>USA</a>
                <a>UK</a>
              </div>
            </div>

            {/* Profile */}
            <div className={`profile-wrapper ${profileDropdown ? "active" : ""}`}>
              <button
                className="icon-btn"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <FiUser size={20} />
              </button>

              <div className="profile-dropdown">
                {isAuthenticated ? (
                  <>
                    <div className="profile-header">
                      <p className="profile-name">{user?.name}</p>
                      <p className="profile-email">{user?.email}</p>
                    </div>
                    <button className="profile-logout" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </>
                ) : (
                  <div className="profile-auth-buttons">
                    <button
                      className="profile-login"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                    <button
                      className="profile-signup"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="search-wrapper" style={{ position: "relative" }}>
              <button 
                className="icon-btn"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen) {
                    setTimeout(() => document.getElementById("search-input")?.focus(), 100);
                  }
                }}
              >
                <FiSearch />
              </button>
              
              {/* Search Input - appears when search icon is clicked */}
              {searchOpen && (
                <div className="search-dropdown">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }
                    }}
                    autoFocus
                    style={{
                      width: "300px",
                      padding: "10px 15px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                  {searchQuery.trim() && (
                    <button
                      onClick={() => {
                        navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      style={{
                        marginTop: "8px",
                        padding: "8px 16px",
                        backgroundColor: "#000",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        width: "100%"
                      }}
                    >
                      Search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button className="icon-btn cart-btn" onClick={() => navigate("/cart")}>
              <FiShoppingCart />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </button>

            {/* Favourites */}
            <button className="icon-btn" onClick={() => navigate("/favourites")}>
              <FiHeart />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
