import FavoriteResults from "@/components/products/favorites-results";
import { Suspense } from "react";

export default async function Favorites() {
  return (
    <Suspense>
      <FavoriteResults />
    </Suspense>
  );
}
