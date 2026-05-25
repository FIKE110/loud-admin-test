import { createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import ResetPasswordPage from "./components/ResetPasswordPage"
import DashboardLayout from "./components/DashboardLayout"
import DashboardPage from "./components/DashboardPage"
import UsersPage from "./components/UsersPage"
import PostsPage from "./components/PostsPage"
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
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "posts", element: <PostsPage /> },
    ],
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
