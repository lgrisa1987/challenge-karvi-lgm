"use client";

import { clearSingleParam, cn, toggleQueryParamInUrl } from "@/lib/utils";
import Arrow from "../ui/icons/arrow";
import { useEffect } from "react";

type PaginationProps = {
  totalPages: number;
  page: string | null;
  currentPage: number;
};

const Pagination = ({ totalPages, page, currentPage }: PaginationProps) => {
  const firstPage = page === "1" || !page;
  const lastPage = page === totalPages.toString();
  const isActive = (n: number) => currentPage === n;

  useEffect(() => {
    return () => {
      clearSingleParam(location.href, "page");
    };
  }, []);
  return (
    <>
      <hr className="mt-9" />
      <div className="flex justify-between gap-2 mt-4">
        <button
          className={cn("karvi-link", {
            "pointer-events-none opacity-10": firstPage,
          })}
          onClick={() =>
            toggleQueryParamInUrl("page", (Number(page) - 1).toString())
          }
        >
          <Arrow />
          Anterior
        </button>
        <ul className="flex gap-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <li key={i}>
              <button
                className={cn("font-bold", {
                  "text-Blue-Blue-800": isActive(i + 1),
                })}
                disabled={isActive(i + 1)}
                onClick={() =>
                  toggleQueryParamInUrl("page", (i + 1).toString())
                }
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={cn("karvi-link", {
            "pointer-events-none opacity-10": lastPage,
          })}
          onClick={() =>
            toggleQueryParamInUrl(
              "page",
              !page ? "2" : (Number(page) + 1).toString()
            )
          }
          disabled={lastPage}
        >
          Próximo
          <Arrow className="rotate-180" />
        </button>
      </div>
    </>
  );
};

export default Pagination;
