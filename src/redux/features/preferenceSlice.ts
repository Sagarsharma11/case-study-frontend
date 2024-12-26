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
      
      state.menuArray = action.payload; 
    },
    setMenu: (state, action: PayloadAction<string>) => {
      
      state.menu = action.payload;
      
    },
    setDropdown: (state, action: PayloadAction<string>) => {
      
      state.dropdownType = action.payload;
      
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      
    },
    setData: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload; 
      
    },
    setCategoryArray: (state, action: PayloadAction<string[]>) => {
      
      state.categoryArray = action.payload; 
    },
    setPopup: (state, action: PayloadAction<boolean>) => {
      
      state.popup = action.payload;
      
    },
  },
});


export const { setMenuArray, setMenu,
  setDropdown,
  setSearch, setData,
  setCategoryArray, setPopup } = preferenceSlice.actions;

export default preferenceSlice.reducer;
