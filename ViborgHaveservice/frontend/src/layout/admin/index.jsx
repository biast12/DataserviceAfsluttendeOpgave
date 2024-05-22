import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { LoginContext } from "../../context/LoginContext";

const AdminLayout = () => {
  const { user } = useContext(LoginContext);
  if (!user) return <Navigate to="/login" replace />;
  return (
    <section className="container px-4 mx-auto">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default AdminLayout;
