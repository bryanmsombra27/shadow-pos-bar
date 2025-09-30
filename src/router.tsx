import { createBrowserRouter } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/admin/home/Home";
import Mesas from "./pages/admin/mesas/Mesas";
import Roles from "./pages/admin/roles/Roles";
import Usuarios from "./pages/admin/usuarios/Usuarios";
import MesasPublic from "./pages/public/Mesas";

export const appRouter = createBrowserRouter([
  {
    path: "",
    index: true,
    element: <MesasPublic />,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "mesas",
        element: <Mesas />,
      },
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "trabajadores",
        element: <Usuarios />,
      },
    ],
  },
]);
