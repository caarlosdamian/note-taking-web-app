import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryParamsTools = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const createQueryString = useCallback(
    (recordParams: Record<string, string>) => {
      const params = new URLSearchParams(recordParams);

      return params.toString();
    },
    [searchParams]
  );

  const setUrlQueryParams = (newParams: string) => {
    if (searchParams.size) {
      const createdNewParams = searchParams.toString() + '&'.concat(newParams);
      const params = new URLSearchParams(createdNewParams);
      return router.push(`${pathname}?${params.toString()}`);
    }
    return router.push(`${pathname}?${params.toString()}`);
  };

  return { createQueryString, setUrlQueryParams };
};
