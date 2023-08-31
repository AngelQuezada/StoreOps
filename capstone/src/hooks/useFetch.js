import { useEffect, useState } from "react";
import axios from "axios";

const BASE_API_URL = "http://localhost:3001";


const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${BASE_API_URL}/${endpoint}`);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    console.log(data)
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;