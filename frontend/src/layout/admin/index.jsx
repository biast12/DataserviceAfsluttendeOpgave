import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { LoginContext } from "../../context/LoginContext";
import Head from "../../components/Head";

const AdminLayout = () => {
  const { user } = useContext(LoginContext);
  if (!user) return <Navigate to="/login" replace />;
  return (
    <section className="container px-4 mx-auto">
      <Head title="Admin Home" description="This is the admin page" icon={"http://localhost:8081/public/images/archive_logo.png"} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default AdminLayout;
