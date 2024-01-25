import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import TestPage from "./pages/TestPage";
import MainPage from "./pages/MainPage";

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
          path: '/mainPage',
          element: <MainPage />
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
