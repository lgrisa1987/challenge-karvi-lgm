import { Item } from "@/types/cars.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoriteState = {
  [x: string]: Item;
};

const getInitialState = (): FavoriteState => {
  const favorites = JSON.parse(localStorage.getItem("favorite-cars") ?? "{}");
  return favorites;
};

const initialState: FavoriteState = {
  ...getInitialState(),
};

const favoritesSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Item>) => {
      const favorite = action.payload;
      const { id } = favorite;
      if (!!state[id]) {
        delete state[id];
        return;
      } else {
        state[id] = favorite;
      }
      localStorage.setItem("favorite-cars", JSON.stringify(state));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
