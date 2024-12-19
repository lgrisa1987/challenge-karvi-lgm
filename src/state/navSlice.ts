import { IS_SERVER } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Mode = "grid" | "list";

type NavState = {
  navExpanded: boolean;
  mode: Mode;
};
const params = IS_SERVER
  ? null
  : (new URLSearchParams(window.location.search).get("mode") as Mode);

const initialState: NavState = {
  navExpanded: false,
  mode: params || "grid",
};
const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNavExpanded: (state, action: PayloadAction<boolean>) => {
      state.navExpanded = action.payload;
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setNavExpanded, setMode } = navSlice.actions;
export default navSlice.reducer;
