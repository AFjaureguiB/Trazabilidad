import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import App from "./routes/App.jsx";
import ProtectedRoute from "./guard/ProtectedRoute.jsx";
import AdminUsers from "./routes/AdminUsers.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/administrar-usuarios",
        element: (
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <h1>Access Denied</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
