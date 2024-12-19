"use client";
import ProductGrid from "@/components/products/product-grid";
import { RootState } from "@/state/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import Arrow from "@/components/ui/icons/arrow";

const FavoriteResults = () => {
  const favorites = useSelector((state: RootState) => state.favorites);
  const favoriteCars = Object.values(favorites);
  return (
    <>
      <Link href="/" className="karvi-link">
        <Arrow />
        Volver
      </Link>
      <div className="w-full">
        <ProductGrid
          products={favoriteCars}
          message="No hay vehículos en favoritos"
        />
      </div>
    </>
  );
};

export default FavoriteResults;
