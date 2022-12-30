import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import api from '../utils/api'

import useSWR, { mutate } from 'swr';
import useToast from '../contexts/toast';

import debounce from 'lodash/debounce';

export const useMemories = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [query, setQuery] = useSearchParams({
    page: 1,
    title: "",
    categoryID: ""
  })
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
      if (res.data.records.length > 0) {
        if (
         query.get("categoryID") || query.get("title") ||
         ((paging.page > query.get("page"))) ||
         (!paging.page || !query.get("page"))
        ) {
          setPaging(res.data.pageSummary);
          setData(res.data.records)
        } else {
          setPaging(res.data.pageSummary);
          setData(data.concat(res.data.records));
        }
      } else {
        setData([])
        setPaging({
          hasNext: false,
          page: 1,
          size: 0,
          total: 0,
        })
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = query.get("page") ? query.get("page") : null
    const categoryID = query.get("categoryID")
    const title = query.get("title")

    if (page || categoryID || title) {
      fetchData(page, categoryID, title)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("page"), query.get("categoryID"), query.get("title")])

  const onChangePage = useCallback((nextPage) => {
    setQuery({page: nextPage});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = debounce((title) => {
    window.scrollTo(0, 0);
    setQuery({title: title});
  }, 1000);

  const onFilter = useCallback((categoryID) => {
    window.scrollTo(0, 0);
    setQuery({categoryID: categoryID});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onAdd = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const { data: res } = await api.post('/cms/memory', data);

        if (res.success) {
          mutate('/cms/memory');
          toast('success', 'Memory berhasil disimpan.');

          navigate('/budgets');
        } else {
          toast('error', 'Terjadi kesalahan ketika menyimpan memory');
        }
      } catch (error) {
        toast('error', error);
      } finally {
        setLoading(false);
      }
    },
    [navigate, toast]
  );

  return {
    data: data ? data : {},
    loading,
    paging,
    onChangePage,
    onSearch,
    onFilter,
    onAdd
  };
};

export const useMemory = (memoryID) => {
  const { data, error, isValidating } = useSWR(`/memory/${memoryID}`);

  return {
    data: data ? data : {},
    loading: (!error && !data) || isValidating,
  };
};