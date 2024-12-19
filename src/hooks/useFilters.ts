import { useSelector } from "react-redux";
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams";
import { RootState } from "@/state/store";
import { Item } from "@/types/cars.types";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 12;

const useFilters = (products: Item[]) => {
  const mode = useSelector((state: RootState) => state.nav.mode);
  const params = useGetAllSearchParams().map((el) => el.value);
  const filteredData = useMemo(() => {
    const filteredProducts = products.filter((item) =>
      Object.values(item).some((value) => params.includes(value.toString()))
    );
    return filteredProducts.length === 0 ? products : filteredProducts;
  }, [products, params]);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paramsUrl = useSearchParams();
  const page = paramsUrl.get("page");
  const sortByPrice = useSearchParams().get("price");
  const currentPage = parseInt(page!, 10) || 1;
  const filteredDataSorted = !sortByPrice
    ? [...filteredData]
    : [...filteredData].sort((a, b) =>
        sortByPrice === "low" ? a.price - b.price : b.price - a.price
      );
  return {
    mode,
    filteredData,
    filteredDataSorted,
    currentPage,
    page,
    totalPages,
    ITEMS_PER_PAGE,
  };
};

export default useFilters;
