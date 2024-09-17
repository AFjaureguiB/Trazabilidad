import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import App from "./routes/App.jsx";
import ProtectedRoute from "./guard/ProtectedRoute.jsx";
import Donors from "./routes/Donors.jsx";
import InfectiousTests from "./routes/InfectiousTests.jsx";
import { userRoles } from "./constants/user.roles.js";
import { userProcesses } from "./constants/user.processes.js";
import "react-toastify/dist/ReactToastify.css";
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
        path: "/donors",
        element: (
          <ProtectedRoute
            userRolesAllowed={[userRoles.ADMIN, userRoles.ASSISTANT]}
            userProcessIdAllowed={userProcesses.DONANTES_TEJIDOS}
          >
            <Donors />
          </ProtectedRoute>
        ),
      },
      {
        path: "/infectious-tests",
        element: (
          <ProtectedRoute
            userRolesAllowed={[userRoles.ADMIN, userRoles.ASSISTANT]}
            userProcessIdAllowed={userProcesses.PRUEBAS_INFECCIOSAS}
          >
            <InfectiousTests />
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
