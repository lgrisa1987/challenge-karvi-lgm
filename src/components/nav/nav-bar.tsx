"use client";

import { setNavExpanded } from "@/state/navSlice";
import { MdFilterList } from "react-icons/md";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="md:hidden">
      <button
        onClick={() => dispatch(setNavExpanded(true))}
        className="karvi-link text-Blue-Blue-800 ml-auto"
      >
        <MdFilterList />
        Filtrar
      </button>
    </div>
  );
};

export default NavBar;
/*  */
