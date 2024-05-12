//useFetch.tsx
//Parent:
//terminar bookingApp? y el admin?

import axios from 'axios';
import { useEffect, useState } from 'react';

import { CityApiResponseType } from '../presentation/Presentation.tsx';

export type fetchedDataType<T> = {
  data: null | T;
};

function useFetch<T>(url: string) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(false);
  // const [data, setData] = useState();

  const [fetchState, setFetchState] = useState<CityApiResponseType>({
    error: null,
    isLoading: true,
    data: null,
  });

  async function fetchData(url: string) {
    // setIsLoading(true);
    setFetchState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await axios.get(url);
      const data = await response.data;

      setFetchState((prev) => ({ ...prev, data: data }));
      // setData(data);
    } catch (error: any) {
      console.error(error);
      setFetchState((prev) => ({ ...prev, error: error }));
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
