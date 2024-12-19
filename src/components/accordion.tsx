"use client";
import { Filters } from "@/types/cars.types";
import Chevron from "@/components/ui/icons/chevron";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RxCross1 } from "react-icons/rx";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { cn, toggleQueryParamInUrl } from "@/lib/utils";
import { setNavExpanded } from "@/state/navSlice";
import { AccordionProps } from "./nav/nav";
import { Item } from "@/types/cars.types";
import { Skeleton } from "./ui/skeleton";

type AccordionItemProps = {
  label: string;
  name: string;
  data: Filters["data"];
  items: Item[];
};

export const AccordionSkeleton = () => {
  return (
    <div className="flex-col md:w-[min(25%,16.5rem)] space-y-1 hidden md:flex">
      {Array.from({ length: 5 }).map((_, key) => (
        <Skeleton className="w-full h-16 hidden md:block" key={key} />
      ))}
    </div>
  );
};

const AccordionItem = ({ label, data, name, items }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (name: string, itemName: string) => {
    dispatch(setNavExpanded(false));
    toggleQueryParamInUrl(name, itemName);
  };
  return (
    <div key={label} className="py-5 border-b border-Grey-Grey-350">
      <h3
        className="font-bold flex justify-between items-center cursor-pointer text-base"
        onClick={() => setExpanded(!expanded)}
      >
        {label}
        <Chevron />
      </h3>
      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            {data.map((item) => {
              const query = item.name.toString().toLowerCase();
              const quantity = items.filter((it) =>
                Object.values(it).includes(item.name)
              ).length;
              return (
                <li
                  key={item.id}
                  className="text-sm pb-5 [&:first-of-type]:pt-5 [&:last-of-type]:pb-0"
                >
                  <button
                    className="capitalize hover:text-Blue-Blue-800"
                    onClick={() => handleClick(name, item.name.toString())}
                  >
                    {query} ({quantity})
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ filters, items }: AccordionProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navExpanded = useSelector((state: RootState) => state.nav.navExpanded);
  const dispatch = useDispatch();
  return (
    <AnimatePresence>
      {(isDesktop || navExpanded) && (
        <motion.div
          className={`${cn(
            "capitalize w-[90%] md:w-[min(25%,16.5rem)] md:flex-shrink-0 fixed md:static overflow-auto h-full bg-white/80 right-0 z-20 top-0 px-4 md:px-0 shadow-2xl md:shadow-none backdrop-blur-2xl"
          )}`}
          initial={{ x: isDesktop ? 0 : "100%" }}
          animate={{ x: 0 }}
          exit={{ x: isDesktop ? 0 : "100%" }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          <button
            className="text-Gray-Gray-1000 hover:text-Blue-Blue-800 block ml-auto mt-3 md:hidden"
            onClick={() => dispatch(setNavExpanded(false))}
          >
            <RxCross1 className="text-2xl" />
          </button>
          {filters.map((filter) => (
            <AccordionItem key={filter.label} {...filter} items={items} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Accordion;
