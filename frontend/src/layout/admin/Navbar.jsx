import { NavLink } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

const NavbarAdmin = () => {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink className="text-xl btn btn-ghost">Home</NavLink>
      </div>
      <div className="flex-none">
        <menu className="px-1 menu menu-horizontal">
          <li>
            <NavLink to="/admin">ADMIN Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/createreview">Create Review</NavLink>
          </li>
          <li>
            <NavLink to="/admin/editreview">Edit Review</NavLink>
          </li>
          <li>
            <NavLink to="/admin/deletereview">Delete Review</NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </menu>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
