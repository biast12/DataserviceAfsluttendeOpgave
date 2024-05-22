import { useState } from "react";
import axios from "axios";
import ErrorPages from "../pages/ErrorPages";

let axiosBase = axios.create({
  baseURL: "https://mongodb-backend-2yxd.onrender.com/",
});

function useRequestData() {
  // Håntere om vi venter på data = loader
  const [isLoading, setIsLoading] = useState(false);

  // Når der er data fra et API inlæses de i staten her
  const [data, setData] = useState(null);

  // Hvis der opstår fejl sætter vi denne til true
  const [error, setError] = useState(false);

  // Ring API'et op - hent data!
  const makeRequest = async (
    url,
    method = "GET",
    headers = null,
    data = null
  ) => {
    let response; // til data mv. fra api'et
    setIsLoading(true);

    // Check if method is valid
    const validMethods = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
      "HEAD",
    ];
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
      // url = "http://localhost:8081/api/" + url;
      response = await axiosBase.request(options); // Use axiosBase here

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
