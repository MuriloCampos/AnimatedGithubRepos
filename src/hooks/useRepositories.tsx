import { useQuery } from 'react-query';
import api from '../services/api';

import RepositoryInterface from '../interfaces/Repository';

interface ApiResponse {
  items: RepositoryInterface[];
  totalPages: number;
}

const getRepositories = async ({ pageParam = 1, queryKey }) => {
  const { data, headers } = await api.get<ApiResponse>(
    `/search/repositories?q=language:${encodeURIComponent(
      queryKey[1],
    )}+is:featured&page=${queryKey[2]}&per_page=10`,
  );

  const totalPages = parseInt(
    headers.link.split('rel=')[1].split('&page=')[1].split('&')[0],
    10,
  );

  return { ...data, totalPages };
};

export default function useRepositories(language: string, page: number) {
  return useQuery<ApiResponse, Error>(
    ['repositories', language, page],
    getRepositories,
    {
      keepPreviousData: true,
    },
  );
}
