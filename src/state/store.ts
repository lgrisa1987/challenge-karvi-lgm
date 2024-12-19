import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/state/navSlice";
import favoritesReducer from "@/state/favoriteSlice";
/* import { localStorageMiddleware } from "./middlewares/localstorage-middleware"; */

export const store = configureStore({
  reducer: { nav: navReducer, cars: favoritesReducer },
  /*  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), */
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
