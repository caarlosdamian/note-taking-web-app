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

  const replaceQuery = (recordParams: Record<string, string>) => {
    const actualParams = new URLSearchParams(params as Record<string, string>);
    for (const [key, value] of Object.entries(recordParams)) {
      actualParams.set(key, value);
    }
    return actualParams.toString();
  };

  const setUrlQueryParams = (recordParams: Record<string, string>) => {
    if (searchParams.size) {
      const newParams = replaceQuery(recordParams);
      return router.push(`${pathname}?${newParams}`);
    }

    return router.push(`${pathname}?${createQueryString(recordParams)}`);
  };

  const removeQueryParams = () => {
    return router.push(`${pathname}`);
  };

  return { createQueryString, setUrlQueryParams, removeQueryParams };
};
