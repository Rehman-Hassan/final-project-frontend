import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getProfile } from "./redux/slices/authSlice"

import Home from "./pages/Home"
import Product from "./pages/Product"
import ProductDetail from "./pages/DetailPage"
import CartPage from "./pages/CartPage"
import FavouritePage from "./pages/FavouritePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Checkout from "./pages/CheckOut"
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

import Header from "./components/Header"
import Footer from "./components/Footer"
import Marquee from "./components/Marquee"
import { CartProvider } from "./context/CartContext"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) dispatch(getProfile())
  }, [dispatch])

  return (
    <CartProvider>
      <Marquee />
    
        <Header />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favourites" element={<FavouritePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </CartProvider>
  )
}

export default App
