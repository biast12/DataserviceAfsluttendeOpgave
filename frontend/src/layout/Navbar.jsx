import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import LogoutButton from "../components/LogoutButton";

const Navbar = () => {
  const { user } = useContext(LoginContext);
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink href="/" className="text-xl btn btn-ghost">
          Home
        </NavLink>
      </div>
      <div className="flex-none">
        <menu className="z-10 px-1 menu menu-horizontal">
          <li>
            <NavLink to="viborghaveservice/aboutus">ViborgHaveservice aboutus</NavLink>
          </li>
          <li>
            <NavLink to="vejret">Vejret</NavLink>
          </li>
          <li>
            <NavLink to="nyheder">Nyheder</NavLink>
          </li>
          <li>
            <NavLink to="energipriser">Energipriser</NavLink>
          </li>
          {!user ? (
            <li>
              <NavLink to="login">Login</NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="admin">Admin</NavLink>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          )}
        </menu>
      </div>
    </nav>
  );
};

export default Navbar;
