"use client";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { RootState } from "@/state/store";
import { Item } from "@/types/cars.types";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams";
import ResultsCount from "@/components/products/results-count";
import ToggleModeBtn from "@/components/nav/toggle-mode-btn";
import Card from "@/components/products/card";
import Pagination from "@/components/products/pagination";
import OrderResults from "@/components/products/order-results";
import { AnimatePresence } from "motion/react";
import useFilters from "@/hooks/useFilters";

type ProductGridProps = {
  products: Item[];
  message?: string;
};

const ProductGrid = ({ products, message }: ProductGridProps) => {
  const {
    mode,
    filteredData,
    filteredDataSorted,
    currentPage,
    page,
    totalPages,
    ITEMS_PER_PAGE,
  } = useFilters(products);
  return (
    <>
      <div className="mt-5 sm:mb-5 flex justify-between items-center">
        <ResultsCount count={filteredData.length} />
        <OrderResults disabled={filteredData.length === 0} />
        <ToggleModeBtn />
      </div>
      {filteredData.length === 0 && (
        <p className="text-center mt-5">{message}</p>
      )}
      <AnimatePresence initial={false}>
        <div
          className={cn(
            "lg:grid-cols-3 md:px-0 gap-x-4 gap-y-6 justify-center h-fit w-full mt-8 md:mt-0",
            { "sm:grid-cols-2 grid": mode === "grid" }
          )}
        >
          {filteredDataSorted
            .slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            )
            .map((product) => (
              <Card key={product.id} car={product} />
            ))}
        </div>
      </AnimatePresence>
      {filteredData.length > ITEMS_PER_PAGE && (
        <Pagination
          totalPages={totalPages}
          page={page}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ProductGrid;
