"use client";
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams";
import { clearAllSearchParams, toggleQueryParamInUrl } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { RxCross1 } from "react-icons/rx";
import TrashIcon from "@/components/ui/icons/trash-icon";

const Filters = () => {
  const allSearchParams = useGetAllSearchParams();
  return (
    <div className="my-5 flex justify-between gap-3 items-start md:items-center flex-wrap md:mt-0">
      <motion.div className="flex flex-wrap gap-2" layout="preserve-aspect">
        <AnimatePresence>
          {allSearchParams.map((param, i) => (
            <motion.button
              className="border border-Blue-Blue-500 py-1 px-3 rounded-full flex gap-2 text-Blue-Blue-800 capitalize text-sm font-medium items-center hover:bg-Blue-Blue-800 hover:text-white transition-colors ease-in-out"
              key={i}
              onClick={() => toggleQueryParamInUrl(param.key, param.value)}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {param.value.toLowerCase()}
              <RxCross1 className="text-xs" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {allSearchParams.length > 0 && (
          <motion.button
            className="text-sm text-Blue-Blue-800 whitespace-nowrap flex items-center justify-between group hover:font-semibold gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => clearAllSearchParams()}
          >
            <TrashIcon />
            <span className="group-hover:underline underline-offset-2 text-inherit">
              Limpiar Filtros
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
