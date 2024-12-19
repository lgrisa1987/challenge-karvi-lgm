import Filters from "@/components/nav/filters";
import Nav from "@/components/nav/nav";
import ProductGrid from "@/components/products/product-grid";
import { getCars } from "@/services/getCars";
import Link from "next/link";
import { IoIosHeart } from "react-icons/io";

export default async function Home() {
  const cars = await getCars();
  if ("error" in cars) return <>{cars.error}</>;
  return (
    <main className="py-8">
      <div className="md:flex w-[min(90%,76.25rem)] mx-auto md:gap-8 relative">
        <Link
          href="/favoritos"
          className="absolute -top-8 right-0 karvi-link text-Blue-Blue-800"
        >
          <IoIosHeart className="size-5" /> Favoritos
        </Link>
        <Nav filters={cars.filters} items={cars.cars} />
        <div>
          <Filters />
          <ProductGrid products={cars.cars} />
        </div>
      </div>
    </main>
  );
}
