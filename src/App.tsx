import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import TestPage from "./pages/TestPage";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import Rules from "./pages/Rules";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/testPage",
          element: <TestPage />,
        },
        {
          path: "/mainPage",
          element: <MainPage />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/rules",
          element: <Rules />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
