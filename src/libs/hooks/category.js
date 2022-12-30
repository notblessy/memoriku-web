import useSWR from 'swr';

export const useCategory = () => {
  const { data, error, isValidating } = useSWR('/category');

  return {
    data: data?.length ? data : [],
    loading: (!error && !data) || isValidating,
  };
};

export const useCategories = () => {
  const { data, error, isValidating } = useSWR('/cms/category');

  return {
    data: data?.records.length ? data.records : [],
    loading: (!error && !data) || isValidating,
  };
};
