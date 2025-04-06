import { useEffect, useState } from "react";

export function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
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
    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }
    return () => {
      controller.abort();
    };
  }, [url, error, options, method]);

  return { data, isPending, error, postData };
}
