import React, { useEffect, useState } from 'react';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stateUrl, setUrl] = useState(url);

  useEffect(() => {
    if (!stateUrl) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(stateUrl, options);
        const json = await res.json();
        if (!res.ok) {
          throw json.message;
        } else {
          setResponse(json);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [stateUrl]);

  return { response, error, loading, setUrl };
};
