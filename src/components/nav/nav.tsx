"use client";
import dynamic from "next/dynamic";
import NavBar from "@/components/nav/nav-bar";
import { Filters } from "@/types/cars.types";
import { Item } from "@/types/cars.types";
import { AccordionSkeleton } from "@/components/accordion";

const Accordion = dynamic(() => import("../accordion"), {
  ssr: false,
  loading: () => <AccordionSkeleton />,
});

export type AccordionProps = {
  filters: Filters[];
  items: Item[];
};

const Nav = ({ filters, items }: AccordionProps) => {
  return (
    <>
      <NavBar />
      <Accordion filters={filters} items={items} />
    </>
  );
};

export default Nav;
