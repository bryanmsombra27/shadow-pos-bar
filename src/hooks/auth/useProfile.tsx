import { profile } from "@/actions/auth";
import { useTokenStore } from "@/store/token";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  const { token } = useTokenStore();

  const { data, error, isPending } = useQuery({
    queryFn: profile,
    queryKey: ["perfil"],
    enabled: !!token,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useProfile;
