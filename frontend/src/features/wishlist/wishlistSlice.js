import { createSlice } from '@reduxjs/toolkit';

const wishlistItemsFromStorage = localStorage.getItem('wishlistItems')
  ? JSON.parse(localStorage.getItem('wishlistItems'))
  : [];

const initialState = {
  wishlistItems: wishlistItemsFromStorage,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const existItemIndex = state.wishlistItems.findIndex((x) => x._id === item._id);

      if (existItemIndex >= 0) {
        // If it exists, remove it
        state.wishlistItems.splice(existItemIndex, 1);
      } else {
        // If it doesn't exist, add it
        state.wishlistItems.push(item);
      }

      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
