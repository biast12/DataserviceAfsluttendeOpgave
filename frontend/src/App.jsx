import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Styles
import "./App.scss";

// Pages
import Layout from "./layout";
import ErrorPages from "./pages/ErrorPages";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Energidata from "./pages/Energidata";
import Nyheder from "./pages/Nyheder";
import Vejret from "./pages/Vejret";
import AboutUs from "./pages/ViborgHaveservice/AboutUs";
import Services from "./pages/ViborgHaveservice/Services";

// Admin Pages
import AdminLayout from "./layout/admin";
import HomeAdmin from "./pages/admin/HomeAdmin";

function App() {
  const router = createBrowserRouter([
    {
      // Public routing
      element: <Layout />,
      errorElement: <ErrorPages />,
      children: [
        { path: "/", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "energidata", element: <Energidata /> },
        { path: "hyheder", element: <Nyheder /> },
        { path: "vejret", element: <Vejret /> },
        { path: "viborghaveservice/aboutus", element: <AboutUs /> },
        { path: "viborghaveservice/services", element: <Services /> },
      ],
    },
    {
      // Admin routing
      element: <AdminLayout />,
      errorElement: <ErrorPages />,
      children: [{ path: "admin", element: <HomeAdmin /> }],
    },
    { path: "*", element: <ErrorPages statusCode={404} /> },
  ]);

  return (
    <div data-theme="dark">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
