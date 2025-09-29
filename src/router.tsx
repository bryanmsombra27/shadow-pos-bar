import { createBrowserRouter } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/admin/home/Home";
import Mesas from "./pages/admin/mesas/Mesas";

export const appRouter = createBrowserRouter([
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
    ],
  },
]);
