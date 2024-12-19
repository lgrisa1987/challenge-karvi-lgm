import { IS_SERVER } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = useCallback(
    (query: string): boolean => {
      if (IS_SERVER) {
        return defaultValue;
      }
      return window.matchMedia(query).matches;
    },
    [defaultValue]
  );

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = useCallback(
    () => setMatches(getMatches(query)),
    [setMatches, getMatches, query]
  );

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query, handleChange]);

  return matches;
}
