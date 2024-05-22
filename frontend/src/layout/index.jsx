import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
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

export default Layout;
