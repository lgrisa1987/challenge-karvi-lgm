import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/state/navSlice";
import favoritesReducer from "@/state/favoriteSlice";

export const store = configureStore({
  reducer: { nav: navReducer, favorites: favoritesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
