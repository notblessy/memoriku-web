import useSWR from 'swr';

export const useMemories = () => {
  const { data, error, isValidating } = useSWR('/memory');
  
  return {
    data: data ? data : {},
    loading: (!error && !data) || isValidating,
  };
};

export const useMemory = (memoryID) => {
  const { data, error, isValidating } = useSWR(`/memory/${memoryID}`);

  return {
    data: data ? data : {},
    loading: (!error && !data) || isValidating,
  };
};