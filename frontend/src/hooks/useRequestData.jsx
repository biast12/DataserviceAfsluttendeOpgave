import { useState } from "react";
import axios from "axios";
import ErrorPages from "../pages/ErrorPages";

function useRequestData() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const makeRequest = async (url, method = "GET", headers = null, data = null) => {
    let response;
    setIsLoading(true);

    // Check if method is valid
    const validMethods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"];
    if (!validMethods.includes(method.toUpperCase())) {
      console.error(`Invalid method: ${method}`);
      setError(true);
      setIsLoading(false);
      return;
    }

    const options = {
      url: url,
      method: method,
      headers: headers,
      data: data,
    };

    try {
      response = await axios.request(options);

      if (response && response.data !== undefined) {
        // Pit data fra api'et i staten "data"
        setData(response.data);
        setError(false);
      } else {
        setData(null);
        setError(true);
        throw new Error("FEJL: Ingen data - eller tomt response");
      }
    } catch (error) {
      setData(null);
      setError(true);
      console.log(error);
      <ErrorPages statusCode={error} />;
    } finally {
      setIsLoading(false);
    }
  };

  return { makeRequest, isLoading, data, error };
}

export default useRequestData;
