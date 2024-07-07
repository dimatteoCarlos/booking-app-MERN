//useFetch.tsx

import axios from 'axios';

import { useEffect, useState } from 'react';

interface Error {
  name: string;
  message: string;
  stack?: string;
}

type FetchStateType<T> = {
  isLoading: boolean;
  error: null | Error;
  data: null | T;
};

const initialState = { isLoading: true, error: null, data: null };

function useAdminFetch<T>(url: string): { fetchState: FetchStateType<T> } {
  const [fetchState, setFetchState] = useState(initialState);

  async function fetchData() {
  
    setFetchState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await axios.get(url);
      const apiResp = await response.data;
      // console.log(response, apiResp);
      setFetchState((prevState) => ({
        ...prevState,
        isLoading: true,
        error: null,
        data: apiResp,
      }));
    } catch (error: any | Error) {
      console.error(error, 'Something went wrong!');
      setFetchState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error,
        // data: null,
      }));
    }finally{setFetchState((prevState) => ({
      ...prevState,
      isLoading: false,
      error: null,
    }));}
  }

  useEffect(() => {
    fetchData();
    
  }, []);

  return {fetchState };
}

export default useAdminFetch;
