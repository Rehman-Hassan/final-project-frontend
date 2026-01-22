import axios from "axios";

export const getCart = async (token) => {
  const res = await axios.get("/api/cart", { headers: { Authorization: `Bearer ${token}` } });
  return res.data.cart || [];
};

export const updateCartItem = async (id, data, token) => {
  const res = await axios.put(`/api/cart/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const removeCartItem = async (id, token) => {
  const res = await axios.delete(`/api/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
