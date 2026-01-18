import { Loader } from "@/components/custom";
import useProfile from "@/hooks/auth/useProfile";
import type { FC } from "react";
import MesasPublic from "../pages/public/Mesas";
import { Navigate } from "react-router";

interface RedirectionByRolWrapperProps {}
const RedirectionByRolWrapper: FC<RedirectionByRolWrapperProps> = ({}) => {
  const { data, error, isPending } = useProfile();

  console.log(error, "error");
  console.log(data);

  if (isPending) return <Loader />;

  if (data && data.rol.nombre.toLowerCase() == "mesero") {
    return <MesasPublic />;
  }

  if (data && data.rol.nombre == "admin") {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }
};

export default RedirectionByRolWrapper;
