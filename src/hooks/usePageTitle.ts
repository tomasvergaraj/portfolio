import { useEffect } from 'react';

const BASE_TITLE = 'Tomas Vergara · Full Stack Developer';

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} · Tomas Vergara` : BASE_TITLE;
  }, [title]);
};
