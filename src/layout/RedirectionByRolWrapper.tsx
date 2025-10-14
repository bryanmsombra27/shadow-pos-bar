import { Loader } from "@/components/custom";
import useProfile from "@/hooks/auth/useProfile";
import type { FC } from "react";
import MesasPublic from "../pages/public/Mesas";
import { Navigate } from "react-router";

interface RedirectionByRolWrapperProps {}
const RedirectionByRolWrapper: FC<RedirectionByRolWrapperProps> = ({}) => {
  const { data, error, isPending } = useProfile();

  if (isPending) return <Loader />;

  return data && data.rol.nombre.toLowerCase() == "mesero" ? (
    <MesasPublic />
  ) : (
    <Navigate
      to="/admin"
      replace
    />
  );
};

export default RedirectionByRolWrapper;
