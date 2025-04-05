import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new error(res.statusText);
        }
        const data = await res.json();
        setIsPending(false);
        setData(data);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("the fetch was aborted");
          setError("the fetch was aborted");
        } else {
          setError("could not fetch the data");
        }
        setIsPending(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url, error]);

  return { data, isPending, error };
}
