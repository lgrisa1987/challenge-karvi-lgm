import { Item } from "@/types/cars.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoriteState = {
  favorites: { [x: string]: Item };
};

const initialState: FavoriteState = {
  favorites: {},
};

const favoritesSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setFavoriteCars(state, action: PayloadAction<{ [x: string]: Item }>) {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Item>) => {
      const favorite = action.payload;
      const { id } = favorite;
      if (!!state.favorites[id]) {
        delete state.favorites[id];
        return;
      } else {
        state.favorites[id] = favorite;
      }
      localStorage.setItem("favorite-cars", JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite, setFavoriteCars } = favoritesSlice.actions;
export default favoritesSlice.reducer;
