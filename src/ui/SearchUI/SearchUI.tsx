import React, { useState, useEffect } from 'react';
import styles from "./SearchUI.module.css";
import { useDispatch } from 'react-redux';
import useDebounce from '../../redux/hooks';
import { setSearch } from "../../redux/features/preferenceSlice";

type Props = {
  inputType: string;
  placeHolder: string;
  onChange?: (value: string) => void; // Optional, accepts a string from the input value
  value: string;
};

const Search = ({ inputType, placeHolder, onChange, value }: Props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(value);

  // Synchronize searchTerm with value prop when it changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Using debounce for the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay

  // Dispatch the debounced value to Redux when it changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(setSearch(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // Call the onChange prop, if provided
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles["search__container"]}>
      <input
        onChange={handleChange}
        className={styles["search--input"]}
        placeholder={placeHolder}
        type={inputType}
        value={searchTerm}
      />
    </div>
  );
};

export default Search;
