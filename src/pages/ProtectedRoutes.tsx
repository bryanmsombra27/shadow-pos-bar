import { useTokenStore } from "@/store/token";
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRoutesProps {
  children: ReactNode;
}
const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const { token } = useTokenStore();

  return !token ? (
    <Navigate
      to="/auth/login"
      replace
    />
  ) : (
    children
  );
};

export default ProtectedRoutes;
