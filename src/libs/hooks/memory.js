import { useCallback, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

import useSWR from 'swr';
// import debounce from 'lodash/debounce';


export const useMemories = () => {
  // const {query, setQuery} = useSearchParams()
  const {page, setPage} = useState(1)

  const pathKey = `/memories?size=6&page=${page}`;
  const { data, error, isValidating } = useSWR(pathKey);

  const onChangePage = useCallback((nextPage) => {
    setPage(nextPage);
  }, [setPage]);

  // const onSearch = debounce((title) => {
  //   setQuery({ title: title });
  // }, 1500);


  return {
    data: data ? data : {},
    loading: (!error && !data) || isValidating,
    onChangePage,
    onSearch,
  };
};

export const useMemory = (memoryID) => {
  const { data, error, isValidating } = useSWR(`/memory/${memoryID}`);

  return {
    data: data ? data : {},
    loading: (!error && !data) || isValidating,
  };
};