import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import api from '../utils/api'

import useSWR from 'swr';
import debounce from 'lodash/debounce';

export const useMemories = () => {
  const [query, setQuery] = useSearchParams()
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    hasNext: false,
    page: 1,
    size: 0,
    total: 0,
  });


  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get(`/memory?size=4&${query.toString()}`);
      if (res.data.records.length) {
        setData(data.concat(res.data.records));
        setPaging(res.data.pageSummary)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // untuk initial load
    const initialPage = 1;
    fetchData(initialPage);
  }, []);

  useEffect(() => {
    if (query.get("page") ) {
      fetchData(query.get("page"))
    }
  }, [query.get("page")])

  const onChangePage = useCallback((nextPage) => {
    setQuery({page: nextPage});
  }, []);

  const onSearch = debounce((title) => {
    setQuery({title: title});
  }, 1500);

  const onFilter = useCallback((categoryID) => {
    setQuery({categoryID: categoryID});
  }, [setQuery])

  console.log(query.toString())

  return {
    data: data ? data : {},
    loading,
    paging,
    onChangePage,
    onSearch,
    onFilter
  };
};

export const useMemory = (memoryID) => {
  const { data, error, isValidating } = useSWR(`/memory/${memoryID}`);

  return {
    data: data ? data : {},
    loading: (!error && !data) || isValidating,
  };
};