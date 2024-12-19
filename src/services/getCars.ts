import { Filters } from "@/types/cars.types";
import { Item } from "@/types/cars.types";

export const getCars = async (): Promise<
  | {
      filters: Filters[];
      cars: Item[];
    }
  | { error: string }
> => {
  try {
    const response = await fetch(
      "https://ast.prd.karvi.com.ar/challenge/cars/ASST-challenge-01JEVJTR90HVPSS2NRPPG02CJ3.json",
      { cache: "no-store" }
    );
    if (!response.ok) throw new Error("Hubo un error al traer la información");
    const cars = await response.json();
    const { year, brand, model, version, city } = cars.availableFilters;
    return {
      filters: [
        { label: "Marca", name: "brand", data: brand },
        { label: "Modelo", name: "model", data: model },
        { label: "Año", name: "year", data: year },
        { label: "Version", name: "version", data: version },
        { label: "Ciudad", name: "city", data: city },
      ],
      cars: cars.items,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
