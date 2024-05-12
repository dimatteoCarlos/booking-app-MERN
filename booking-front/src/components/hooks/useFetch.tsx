//useFetch.tsx
//Parent:
//terminar bookingApp? y el admin?

import axios from 'axios';
import { useEffect, useState } from 'react';

export type UseFetchStateType<T> = {
  data: null | T; //api response type
  error: null | Error;
  isLoading: boolean;
};

function useFetch<T>(url: string) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(false);
  // const [data, setData] = useState();

  const [fetchState, setFetchState] = useState<UseFetchStateType<T>>({
    error: null,
    isLoading: true,
    data: null,
  });

  async function fetchData(url: string) {
    // setIsLoading(true);
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
      // setData(data);
    } catch (error: any) {
      console.error(error);
      setFetchState((prev) => ({ ...prev, error: error, isLoading: false }));
      // setError(error);
    } finally {
      // setIsLoading(false);
      setFetchState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  useEffect(() => {
    fetchData(url);
    return () => {
      setFetchState((prev) => ({ ...prev, isLoading: false }));
    };
  }, [url]);

  return fetchState;
}

export default useFetch;
