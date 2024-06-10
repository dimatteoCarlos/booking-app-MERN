//useFetch.tsx

import axios from 'axios';
import { useEffect, useState } from 'react';

export type UseFetchStateType<T> = {
  data: null | T; //inside api response type
  error: null | Error;
  isLoading: boolean;
  fetchData?: () => Promise<void>;
};

function useFetch<T>(url: string) {
  const [fetchState, setFetchState] = useState<UseFetchStateType<T>>({
    error: null,
    isLoading: true,
    data: null,
  });

  async function reFetch() {
    setFetchState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.get(url);
      const apiResponseData = await response.data;
      setFetchState((prev) => ({
        ...prev,
        data: apiResponseData,
        error: null,
        isLoading: false,
      }));

      // console.log('Desde reFetch', url);
    } catch (error: any) {
      console.error(error);
      setFetchState((prev) => ({ ...prev, error: error, isLoading: false }));
    }
  }

  async function fetchData(url: string) {
    setFetchState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await axios.get(url);
      const apiResponseData = await response.data;
      setFetchState((prev) => ({
        ...prev,
        data: apiResponseData,
        error: null,
        isLoading: false,
      }));
    } catch (error: any) {
      console.error(error);
      setFetchState((prev) => ({ ...prev, error: error, isLoading: false }));
    } finally {
      setFetchState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  //--------------------
  useEffect(() => {
    fetchData(url);
  }, []);

  return { fetchState, reFetch };
}

export default useFetch;
