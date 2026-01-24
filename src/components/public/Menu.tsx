import { type FC } from "react";
import MenuItem from "./MenuItem";
import { Button } from "../ui/button";
import useTodosLosProductos from "@/hooks/productos/useTodosLosProductos";
import { Loader } from "../custom";
import { useMenuStore } from "@/store/menu";
import useCrearOrden from "@/hooks/ordenes/useCrearOrden";
import { useMesaStore } from "@/store/mesa";
import useProfile from "@/hooks/auth/useProfile";

interface MenuProps {}
const Menu: FC<MenuProps> = ({}) => {
  const { data, error, isPending } = useTodosLosProductos();
  const { pedidos, clearPerdidos } = useMenuStore();
  const { mesa_id, setMesa } = useMesaStore();
  const { isPending: isOrderPending, mutateAsync } = useCrearOrden();
  const {
    data: profileData,
    error: profileError,
    isPending: profileIsPending,
  } = useProfile();

  const handleOrder = async () => {
    await mutateAsync({
      mesero_id: profileData!.id,
      productos: pedidos,
      mesa_id,
    });

    clearPerdidos();
    setMesa("");
  };

  if (isPending || profileIsPending) return <Loader />;

  if (error || profileError)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener los productos
      </span>
    );

  if (data)
    return (
      <div className="container px-10 mx-auto">
        <div className="flex px-10  items-center justify-between mt-10">
          <h1 className="text-2xl font-bold mt-5">Menu</h1>
          {pedidos.length > 0 && (
            <Button
              onClick={handleOrder}
              disabled={isOrderPending}
              className={
                isPending
                  ? `cursor-not-allowed pointer-events-none opacity-30`
                  : ""
              }
            >
              Tomar Orden
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 mx-auto  ">
          {data.productos.map((producto) => (
            <MenuItem
              producto={producto}
              key={producto.id}
            />
          ))}
        </div>
      </div>
    );
};

export default Menu;
