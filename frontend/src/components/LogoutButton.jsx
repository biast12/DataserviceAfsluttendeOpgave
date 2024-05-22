import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const { signOut } = useContext(LoginContext);
  return <button onClick={() => signOut()}>Logout</button>;
};

export default LogoutButton;
