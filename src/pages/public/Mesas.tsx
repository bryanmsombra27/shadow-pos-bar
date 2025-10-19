import { Loader } from "@/components/custom";
import TableClient from "@/components/public/TableClient";
import { Button } from "@/components/ui/button";
import useLogOut from "@/hooks/auth/useLogOut";
import useProfile from "@/hooks/auth/useProfile";
import useTodasLasMesas from "@/hooks/mesas/useTodasLasMesas";
import { LogOutIcon } from "lucide-react";
import type { FC } from "react";
import { socket } from "@/config/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Mesa, TodasLasMesas } from "@/interfaces/mesa.interface";

interface MesasProps {}
const Mesas: FC<MesasProps> = ({}) => {
  const { data, error, isPending } = useTodasLasMesas();
  const { data: profile, isPending: isProfilePending } = useProfile();
  const { mutateAsync, isPending: isLogoutPending } = useLogOut();
  const queryclient = useQueryClient();

  useEffect(() => {
    const handleTable = async (mesa: Mesa) => {
      console.log(mesa, "INFO DE SOCKET SERVER");

      // await queryclient.setQueryData(
      //   ["todas-mesas"],
      //   (prevState: TodasLasMesas) =>
      //     mesa
      //       ? prevState.mesas?.map((item) => {
      //           if (item.id == mesa.id) {
      //             return mesa;
      //           }

      //           return item;
      //         })
      //       : prevState
      // );
      await queryclient.setQueryData(
        ["todas-mesas"],
        // (prevState: { mesas: TodasLasMesas }) => {
        (prevState: any) => {
          console.log(prevState, "estado previo");
          // console.log(prevState.mesas.mesas, "estado previo");

          // return mesa
          //   ? prevState.mesas.mesas.map((item) => {
          //       console.log(item, "mesa iterada");
          //       if (item.id == mesa.id) {
          //         console.log("debe entrar ");
          //         return mesa;
          //       }

          //       return item;
          //     })
          //   : prevState;

          if (mesa) {
            console.log("DEBE ENTRAR AQUI DE AWEBO");
            console.log(prevState.mesas, "ESTADO PREVIO ENTRANDO");
            const mesas = prevState.mesas.map((item: any) => {
              console.log(item, "mesa iterada");
              if (item.id == mesa.id) {
                console.log("debe entrar ");
                return mesa;
              }

              return item;
            });
            return {
              mesas,
            };
          } else {
            return prevState;
          }
        }
      );
    };

    if (socket) {
      socket.on("mesa", handleTable);
    }

    return () => {
      socket.off("mesa", handleTable);
    };
  }, [socket]);

  const handleLogOut = async () => {
    await mutateAsync();
  };

  if (isPending || isProfilePending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las mesas
      </span>
    );

  return (
    <>
      <h1 className="text-center my-5 font-bold text-4xl"> Mesas </h1>

      {profile?.rol.nombre == "mesero" && (
        <div className="flex justify-end container px-10">
          <Button
            onClick={handleLogOut}
            disabled={isLogoutPending}
            className={
              isLogoutPending
                ? `cursor-not-allowed pointer-events-none opacity-30`
                : ""
            }
          >
            <LogOutIcon />
            Cerrar Sesión{" "}
          </Button>
        </div>
      )}

      <div className="container grid grid-cols-5 mt-5 gap-10 p-10">
        {data &&
          data.mesas.map((mesa) => (
            <TableClient
              mesa={mesa}
              key={mesa.id}
            />
          ))}
      </div>
    </>
  );
};

export default Mesas;
