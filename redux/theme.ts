import { createSlice } from "@reduxjs/toolkit";

const init = {
  mode:
    typeof window !== undefined &&
    window &&
    typeof window.localStorage !== undefined &&
    localStorage.getItem("darkMode")
      ? JSON.parse(window.localStorage.getItem("darkMode")!)
      : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: init,
  reducers: {
    toggle: (state) => {
      state.mode = !state.mode;
      if (window && typeof window !== "undefined") {
        window.localStorage.setItem("darkMode", JSON.stringify(state.mode));
      }
    },
  },
});

export default themeSlice.reducer;

export const { toggle } = themeSlice.actions;
