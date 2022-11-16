import useSWR from 'swr';

export const useMemory = () => {
  const { data, error, isValidating } = useSWR('/memory');
console.log(data)
  return {
    data: data ? data : {},
    loading: (!error && !data) || isValidating,
  };
};
