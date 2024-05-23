import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Head from "../components/Head";

const Layout = () => {
  return (
    <section className="container px-4 mx-auto">
      <Head title="Home" description="This is the home page" icon={"http://localhost:8081/public/images/archive_logo.png"} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default Layout;
