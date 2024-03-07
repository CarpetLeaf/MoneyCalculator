import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import TestPage from "./pages/TestPage";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import Rules from "./pages/Rules";
import Login from "./pages/Login";
import PrivateRoute from "./components/ProvateRoute";
import { ThemeProvider } from "@emotion/react";
import { theme, themeSecondary } from "./theming/theme";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const useRulesSelector: TypedUseSelectorHook<RootState> = useSelector;
  const isDarkMode = useRulesSelector((state) => state.darkMode.isDarkMode);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ThemeProvider theme={isDarkMode ? theme : themeSecondary}>
          <Layout />
        </ThemeProvider>
      ),
      children: [
        {
          path: "/testPage",
          element: (
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/mainPage",
          element: (
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "/rules",
          element: (
            <PrivateRoute>
              <Rules />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
