//SearchContext.tsx
//Parent:ListOfHotel.tsx, Search.tsx

import { createContext, useContext, useReducer } from 'react';
import { SearchReducer } from '../reducer/SearchReducer.tsx';

import { Range } from 'react-date-range';

export type SearchStateType = {
  destination: string;
  date: Range[] | { startDate: Date; endDate: Date; key?: string }[];
  // date: {startDate:Date, endDate:Date,key?:string }[];
  // date: [];
  options: {
    adults: number;
    children: number;
    rooms: number;
  };
};
//deberia tener la mismas propiedades que el estado que se define en search: city, date, option
export const INITIAL_SEARCH_STATE: SearchStateType = {
  destination: '',
  date: [{ startDate: new Date(), endDate: new Date() }],
  options: {
    adults: 0,
    children: 0,
    rooms: 1,
  },
};

type SearchProviderPropType = {
  children: React.ReactNode;
};

const SearchContext = createContext<{
  searchState: SearchStateType;
  searchDispatch: React.Dispatch<any>;
}>({ searchState: INITIAL_SEARCH_STATE, searchDispatch: () => null });

function SearchContextProvider({ children }: SearchProviderPropType) {
  const [searchState, searchDispatch] = useReducer(
    SearchReducer,
    INITIAL_SEARCH_STATE
  );

  return (
    <SearchContext.Provider value={{ searchState, searchDispatch }}>
      {children}
    </SearchContext.Provider>
  );
}

const useSearchData = () => useContext(SearchContext);

export default SearchContextProvider;
export { SearchContext, useSearchData };
