import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from 'utils/helpers';

/**
 * Re-usable SWR api implementation.
 *
 * @param {string} url
 * @param {object} params
 * @returns object
 */
function useApi(url, params = {}) {
  const usp = new URLSearchParams(params);
  const [cacheData, setCacheData] = useState<any>();

  // Create a stable key for SWR
  usp.sort();
  const qs = usp.toString();

  const { data, error, mutate } = useSWR(url && `${url}?${qs}`, fetcher);

  const isLoading = !error && !data;

  useEffect(() => {
    if(isLoading) return;
    setCacheData(data);
  }, [data]);

  return {
    loading: !error && !data,
    data: cacheData,
    error,
    mutate
  };
}

export default useApi;