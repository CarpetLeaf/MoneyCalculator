import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import TestPage from "./pages/TestPage";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
