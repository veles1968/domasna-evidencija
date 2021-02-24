import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    // setError(false);
    // console.log("Error: " + response);

    setData(response.data);
    // setData(response);

    // console.log("1. response = " + JSON.stringify(response));

    return response;
  };

  return { data, error, loading, request };
};
