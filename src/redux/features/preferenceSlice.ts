import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  menuArray: string[];
  menu: string;
  search: string;
  data: string[] ;
  categoryArray: string[];
  dropdownType: string;
  popup: boolean;
}

const initialState: CounterState = {
  menuArray: [],
  menu: "",
  search: "",
  data: [],
  categoryArray: [],
  dropdownType: "",
  popup: false,
};

export const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setMenuArray: (state, action: PayloadAction<string[]>) => {
      // console.log("Menu Array:", action.payload);
      state.menuArray = action.payload; // Update the menuArray
    },
    setMenu: (state, action: PayloadAction<string>) => {
      // console.log("Payload:", action.payload);
      state.menu = action.payload;
      // console.log("Updated State:", JSON.parse(JSON.stringify(state)));
    },
    setDropdown: (state, action: PayloadAction<string>) => {
      // console.log("Payload:", action.payload);
      state.dropdownType = action.payload;
      // console.log("Updated State:", JSON.parse(JSON.stringify(state)));
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      // console.log("Updated State:", JSON.parse(JSON.stringify(state)));
    },
    setData: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload; // Replace the existing data with the new array
      // console.log("Updated Data:", state.data);
    },
    setCategoryArray: (state, action: PayloadAction<string[]>) => {
      // console.log("Menu Array:", action.payload);
      state.categoryArray = action.payload; // Update the menuArray
    },
    setPopup: (state, action: PayloadAction<boolean>) => {
      // console.log("Payload:", action.payload);
      state.popup = action.payload;
      // console.log("Updated State:", JSON.parse(JSON.stringify(state)));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuArray, setMenu,
  setDropdown,
  setSearch, setData,
  setCategoryArray, setPopup } = preferenceSlice.actions;

export default preferenceSlice.reducer;
