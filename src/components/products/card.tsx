"use client";
import CalculatorIcon from "@/components/ui/icons/calculator-icon";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { cn, formatNumber } from "@/lib/utils";
import { motion } from "motion/react";
import Carousel from "@/components/products/carousel";
import { Item } from "@/types/cars.types";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { toggleFavorite } from "@/state/favoriteSlice";

type CardProps = {
  car: Item;
};

const Card = ({ car }: CardProps) => {
  const { year, mileage, model, version, price, city } = car;
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.nav.mode);
  const isFavorite = useSelector(
    (state: RootState) => !!state.cars.favorites[car.id]
  );

  return (
    <motion.div
      className={`${cn(
        "rounded-xl shadow-card-grid grid text-Gray-Gray-1000 font-medium max-w-[24.6875rem]",
        {
          "grid-cols-[min(40%,7.5rem),auto] gap-2 shadow-none border-b py-5 rounded-none max-w-full":
            mode === "list",
        }
      )}`}
      layout="preserve-aspect"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{
        duration: 0.5,
        layout: { duration: 1.25, type: "spring" },
      }}
    >
      <div
        className={cn("p-2 relative", {
          "py-0 px-0": mode === "list",
        })}
      >
        <Carousel model={model} />
        <button
          className="size-[1.75rem] absolute right-[5%] top-[8%] rounded-full bg-white flex items-center justify-center hover:text-Blue-Blue-800 transition-colors hover:bg-Blue-Blue-100"
          onClick={() => dispatch(toggleFavorite(car))}
        >
          {isFavorite ? (
            <IoIosHeart className="size-5 text-Blue-Blue-800" />
          ) : (
            <IoIosHeartEmpty className="size-5" />
          )}
        </button>
      </div>
      <div className={cn("px-4 pt-2 pb-3", { "px-0 py-0": mode === "list" })}>
        <div className="flex gap-2 mb-1.5">
          {[year, mileage].map((stat, i) => (
            <span
              className="rounded-[4rem] flex items-center justify-center py-[0.125rem] px-2 bg-Grey-Grey-200 text-[0.75rem]/[1.2]"
              key={i}
            >
              {!i ? stat : formatNumber(stat)}
              {i ? " km" : ""}
            </span>
          ))}
        </div>
        <div
          className={cn("[&>*]:text-base capitalize", {
            "[&>*]:text-sm": mode === "list",
          })}
        >
          <h2 className="font-bold leading-[1.3]">{model.toLowerCase()}</h2>
          <p>{version.toLowerCase()}</p>
        </div>
        <h3
          className={cn(
            "text-Orange-Orange-700 text-[1.375rem] leading-[1.2] mt-2",
            { "text-[1.125rem] mt-0": mode === "list" }
          )}
        >
          R$ {formatNumber(price)}
        </h3>
        <span
          className={cn("text-sm text-Grey-Grey-700 block", {
            "text-xs": mode === "list",
          })}
        >
          {city}
        </span>
        {mode === "grid" && (
          <button className="bg-Blue-Blue-800 mt-3 text-white rounded-[3.125rem] h-11 flex items-center justify-center text-sm font-bold w-full gap-2 hover:bg-Blue-Blue-900 transition-colors ease-in-out">
            <CalculatorIcon />
            Simular parcelas
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
