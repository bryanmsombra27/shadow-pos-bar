import { createBrowserRouter, Navigate } from "react-router";
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
import { UsuariosPaginacionProvider } from "./store/UsuariosPaginacion";
import { ProductosPaginacionProvider } from "./store/ProductosPaginacion";
import Login from "./pages/auth/Login";
// import RedirectionByRolWrapper from "./layout/RedirectionByRolWrapper";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Barra from "./pages/admin/barra/Barra";
import Orders from "./pages/ordenes/Orders";

export const appRouter = createBrowserRouter([
  {
    path: "",

    // element: <RedirectionByRolWrapper />,
    element: (
      <ProtectedRoutes>
        <AdminLayout />
      </ProtectedRoutes>
    ),
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
        path: "barra",
        element: <Barra />,
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
        element: (
          <UsuariosPaginacionProvider>
            <Usuarios />
          </UsuariosPaginacionProvider>
        ),
      },
      {
        path: "productos",
        element: (
          <ProductosPaginacionProvider>
            <Productos />
          </ProductosPaginacionProvider>
        ),
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
        element: <MesasPublic />,
      },
      {
        path: "mis-ordenes",
        element: <Orders />,
      },
      {
        path: "orden/:id",
        element: <OrderDetails />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "menu/:mesa_id",
    element: (
      <ProductosPaginacionProvider>
        <Menu />
      </ProductosPaginacionProvider>
    ),
  },

  {
    path: "*",
    element: (
      <Navigate
        to="/auth/login"
        replace
      />
    ),
  },
]);
