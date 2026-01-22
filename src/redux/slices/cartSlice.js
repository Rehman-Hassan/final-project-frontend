import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ordersAPI } from '../../services/api'

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  loading: false,
  error: null,
}

// Async thunk for placing order
export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.placeOrder(orderData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to place order'
      )
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity, image } = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity,
          image,
        })
      }

      state.totalPrice += price * quantity
      state.totalQuantity += quantity
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload
      const item = state.items.find(item => item.id === id)

      if (item) {
        state.totalPrice -= item.price * item.quantity
        state.totalQuantity -= item.quantity
        state.items = state.items.filter(item => item.id !== id)
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)

      if (item) {
        const priceDifference = item.price * (quantity - item.quantity)
        state.totalPrice += priceDifference
        state.totalQuantity += quantity - item.quantity
        item.quantity = quantity
      }
    },

    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
      state.totalQuantity = 0
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false
        // Clear cart after successful order
        state.items = []
        state.totalPrice = 0
        state.totalQuantity = 0
        state.error = null
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
