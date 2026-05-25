import { createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import ResetPasswordPage from "./components/ResetPasswordPage"
import DashboardPage from "./components/DashboardPage"
import NotFound from "./components/NotFound"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
