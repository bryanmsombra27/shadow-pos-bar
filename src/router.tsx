import { createBrowserRouter } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/admin/home/Home";
import Mesas from "./pages/admin/mesas/Mesas";
import Roles from "./pages/admin/roles/Roles";
import Usuarios from "./pages/admin/usuarios/Usuarios";
import MesasPublic from "./pages/public/Mesas";
import Productos from "./pages/admin/productos/Productos";
import Categorias from "./pages/categorias/Categorias";
import Menu from "./components/public/Menu";
import OrderDetails from "./pages/admin/ordenes/OrderDetails";
import { RolPaginacionProvider } from "./store/rolPaginacion";
import { CategoriasPaginacionProvider } from "./store/CategoriasPaginacion";

export const appRouter = createBrowserRouter([
  {
    path: "",
    index: true,
    element: <MesasPublic />,
  },
  {
    path: "menu",
    element: <Menu />,
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
        element: (
          <>
            <RolPaginacionProvider>
              <Roles />
            </RolPaginacionProvider>
          </>
        ),
      },
      {
        path: "trabajadores",
        element: <Usuarios />,
      },
      {
        path: "productos",
        element: <Productos />,
      },
      {
        path: "categorias",
        element: (
          <CategoriasPaginacionProvider>
            <Categorias />
          </CategoriasPaginacionProvider>
        ),
      },
      {
        path: "ordenes",
        element: <MesasPublic isAdmin />,
      },
      {
        path: "orden/:id",
        element: <OrderDetails />,
      },
    ],
  },
]);
