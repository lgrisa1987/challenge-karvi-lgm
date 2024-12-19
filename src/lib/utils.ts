import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const toggleQueryParamInUrl = (query: string, value: string) => {
  if (IS_SERVER) return;
  const url = new URL(window.location.href);
  const params = url.searchParams;
  if (["mode", "page", "price"].includes(query)) {
    params.set(query, value);
  } else {
    const currentBrands = params.get(query)
      ? params.get(query)?.split(",")
      : [];
    if (currentBrands)
      if (currentBrands.includes(value)) {
        const updatedBrands = currentBrands.filter((b) => b !== value);
        if (updatedBrands.length > 0)
          params.set(query, updatedBrands.join(","));
        else params.delete(query);
      } else {
        currentBrands.push(value);
        params.set(query, currentBrands.join(","));
      }
  }

  const decodedUrl = decodeURIComponent(url.toString());
  window.history.replaceState({}, "", decodedUrl);
};

export const clearAllSearchParams = () => {
  if (IS_SERVER) return;
  const urlObj = new URL(window.location.href);
  ["brand", "model", "year", "version", "city"].forEach((query) =>
    urlObj.searchParams.delete(query)
  );
  window.history.replaceState({}, "", urlObj.toString());
};
export const clearSingleParam = (url: string, parameter: string) => {
  if (IS_SERVER) return;
  const urlObj = new URL(url);
  urlObj.searchParams.delete(parameter);
  window.history.replaceState({}, "", urlObj.toString());
};

export const formatNumber = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const IS_SERVER = typeof window === "undefined";
