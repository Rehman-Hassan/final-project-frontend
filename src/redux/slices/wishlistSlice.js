import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalCount: 0,
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id, name, price, image } = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (!existingItem) {
        state.items.push({
          id,
          name,
          price,
          image,
        })
        state.totalCount += 1
      }
    },

    removeFromWishlist: (state, action) => {
      const { id } = action.payload
      const exists = state.items.find(item => item.id === id)

      if (exists) {
        state.items = state.items.filter(item => item.id !== id)
        state.totalCount -= 1
      }
    },

    clearWishlist: (state) => {
      state.items = []
      state.totalCount = 0
    },

    isInWishlist: (state, action) => {
      const { id } = action.payload
      return state.items.some(item => item.id === id)
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist, isInWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
