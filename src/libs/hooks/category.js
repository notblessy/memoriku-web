import useSWR from 'swr';

export const useCategory = () => {
  const { data, error, isValidating } = useSWR('/category');

  return {
    data: data?.length ? data : [],
    loading: (!error && !data) || isValidating,
  };
};
