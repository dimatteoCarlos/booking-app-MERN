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

  async function fetchData(url: string) {
    setFetchState((prevState) => ({ ...prevState, isLoading: true }));
    console.log('useAdminFetch: url', url);

    try {
      //--------AXIOS------------------------
      const response = await axios.get(url, {withCredentials:true});

      const apiResp = await response.data;

      //********************************** */
       //--------FETCH-----------------------
      //  const FETCH_OPTIONS = {
      //   headers: { 'Content-Type': 'application/json; chartset=utf-8'},
      //   credentials:'include' as RequestCredentials,
      // };
      
      // const options = { method: 'GET' };
      // const response = await fetch(url, {...FETCH_OPTIONS, ...options
      // });

      // const errMsg = `Something went wrong!.Status: ${response.status}`;
      // if (!response.ok) {
      //   throw new Error(errMsg);
      //   console.log('entro aqui')
      // }
      // const apiResp = await response.json();

      //-----------------------------------
      console.log(apiResp);
      console.log('No. of Elems.:', apiResp.length);
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
        data: null,
      }));
    } finally {
      setFetchState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: null,
      }));
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { fetchState };
}

export default useAdminFetch;
