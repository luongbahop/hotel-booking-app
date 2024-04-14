import { useState, useEffect } from "react";
import axios from "axios";
import getEnvVars from "environment";

const CONFIGS = getEnvVars();

function useData({ url = "", params = "", execute = false }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!execute) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${CONFIGS.API_URL}/api/v1/${url}`, {
          params: params ? JSON.parse(params) : {},
        });
        setData(response.data?.data || response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, params, execute]);

  return { data, isLoading, error };
}

export default useData;
