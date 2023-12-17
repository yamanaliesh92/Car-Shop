import { createSlice } from "@reduxjs/toolkit";

const init = {
  mode:
    typeof window !== undefined &&
    typeof window.localStorage !== undefined &&
    localStorage.getItem("darkMode")
      ? JSON.parse(localStorage.getItem("darkMode")!)
      : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: init,
  reducers: {
    toggle: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
  },
});

export default themeSlice.reducer;

export const { toggle } = themeSlice.actions;
