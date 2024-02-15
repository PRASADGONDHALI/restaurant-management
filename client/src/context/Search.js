import React, { createContext, useContext, useEffect, useState } from 'react';
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
       keyword : "",
       result :[]
      })
    
  return (
    <SearchContext.Provider value={[ auth, setAuth ]}>
      {children}
    </SearchContext.Provider>
  );
};
const useSearch = () => useContext(SearchContext);
export { SearchProvider, useSearch };
