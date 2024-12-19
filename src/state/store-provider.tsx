"use client";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { useEffect } from "react";
import { setFavoriteCars } from "./favoriteSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite-cars") ?? "{}");
    store.dispatch(setFavoriteCars(favorites));
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
