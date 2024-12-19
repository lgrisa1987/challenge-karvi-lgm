"use client";

import { toggleQueryParamInUrl } from "@/lib/utils";
import { setMode } from "@/state/navSlice";
import { RootState } from "@/state/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoList } from "react-icons/io5";
import { BsGrid } from "react-icons/bs";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ToggleModeBtn = () => {
  const mode = useSelector((state: RootState) => state.nav.mode);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const handleChangeMode = useCallback(() => {
    const m = mode === "grid" ? "list" : "grid";
    dispatch(setMode(m));
  }, [dispatch, mode]);
  useEffect(() => {
    toggleQueryParamInUrl("mode", mode);
  }, [mode]);

  useEffect(() => {
    if (isDesktop) dispatch(setMode("grid"));
  }, [isDesktop, dispatch]);

  return (
    <button
      onClick={handleChangeMode}
      className="md:hidden hover:text-Blue-Blue-800"
    >
      {mode === "grid" ? (
        <IoList className="text-2xl" />
      ) : (
        <BsGrid className="text-2xl" />
      )}
    </button>
  );
};

export default ToggleModeBtn;
