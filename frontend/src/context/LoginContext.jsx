import { createContext, useState, useEffect } from "react";
import useRequestData from "../hooks/useRequestData";
import Error from "../pages/ErrorPages";
import Loader from "../components/Loader";

export const LoginContext = createContext();

const LoginContextProvider = (probs) => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    if (data && data.token) {
      setUser(data.record.username);
      setToken(data.token);
    } else {
      signOut();
    }
  }, [data]);

  const signIn = (identity, password) => {
    const fd = new FormData();
    fd.append("identity", identity);
    fd.append("password", password);
    makeRequest("http://localhost:8082/api/collections/users/auth-with-password", "POST", null, fd);
  };
  const signOut = () => {
    setUser();
    setToken();
  };
  return (
    <>
      {error && <Error statusCode={error} />}
      {isLoading && <Loader />}
      <LoginContext.Provider value={{ signIn, signOut, user, token }}>
        {probs.children}
      </LoginContext.Provider>
    </>
  );
};

export default LoginContextProvider;
