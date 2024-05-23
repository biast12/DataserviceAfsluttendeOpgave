import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Styles
import "./App.scss";

// Pages
import Layout from "./layout";
import ErrorPages from "./pages/ErrorPages";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Energipriser from "./pages/Energipriser";
import Nyheder from "./pages/Nyheder";
import Vejret from "./pages/Vejret";
import AboutUs from "./pages/ViborgHaveservice/AboutUs";
import Reviews from "./pages/ViborgHaveservice/Reviews";
import YoutubeDownloader from "./pages/YoutubeDownloader";

// Admin Pages
import AdminLayout from "./layout/admin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import CreateReview from "./pages/admin/CreateReview";
import EditReview from "./pages/admin/EditReview";
import DeleteReview from "./pages/admin/DeleteReview";
import EditAboutUs from "./pages/admin/EditAboutUs";

function App() {
  const router = createBrowserRouter([
    {
      // Public routing
      element: <Layout />,
      errorElement: <ErrorPages />,
      children: [
        { path: "/", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "energipriser", element: <Energipriser /> },
        { path: "nyheder", element: <Nyheder /> },
        { path: "vejret", element: <Vejret /> },
        { path: "viborghaveservice/aboutus", element: <AboutUs /> },
        { path: "viborghaveservice/reviews", element: <Reviews /> },
        { path: "youtubedownloader", element: <YoutubeDownloader /> },
      ],
    },
    {
      // Admin routing
      element: <AdminLayout />,
      errorElement: <ErrorPages />,
      children: [
        { path: "admin", element: <HomeAdmin /> },
        { path: "admin/createreview", element: <CreateReview /> },
        { path: "admin/editreview", element: <EditReview /> },
        { path: "admin/deletereview", element: <DeleteReview /> },
        { path: "admin/editaboutus", element: <EditAboutUs /> },
      ],
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
