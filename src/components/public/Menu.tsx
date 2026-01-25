import { useState, type FC } from "react";
import MenuItem from "./MenuItem";
import { Button } from "../ui/button";
import { CategoriesTabs, Loader, TabsComponent } from "../custom";
import { useMenuStore } from "@/store/menu";
import useCrearOrden from "@/hooks/ordenes/useCrearOrden";
import { useMesaStore } from "@/store/mesa";
import useProfile from "@/hooks/auth/useProfile";
import { MdDeleteForever } from "react-icons/md";
import useObtenerProductos from "@/hooks/productos/useObtenerProductos";
import useObtenerTodasLasCategorias from "@/hooks/categorias/useObtenerTodasLasCategorias";

interface MenuProps {}
const Menu: FC<MenuProps> = ({}) => {
  const { data, error, isPending } = useObtenerProductos();
  const {
    data: categoriasData,
    error: categoriasError,
    isPending: categoriasPending,
  } = useObtenerTodasLasCategorias();
  const { mesa_id, setMesa } = useMesaStore();
  const { isPending: isOrderPending, mutateAsync } = useCrearOrden();

  const [productoEliminado, setProductoEliminado] = useState<string>("");
  const { pedidos, clearPerdidos, removePedido } = useMenuStore();

  const {
    data: profileData,
    error: profileError,
    isPending: profileIsPending,
  } = useProfile();

  const handleOrder = async () => {
    await mutateAsync({
      mesero_id: profileData!.id,
      productos: pedidos.map((pedido) => ({
        cantidad: pedido.cantidad,
        precio: pedido.precio,
        producto_id: pedido.producto_id,
      })),
      mesa_id,
    });

    clearPerdidos();
    setMesa("");
  };

  if (profileIsPending) return <Loader />;

  if (error || profileError || categoriasError)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener los productos
      </span>
    );

  if (data)
    return (
      <div className="container px-10 mx-auto">
        <div className="flex px-10  items-center justify-between mt-10 mb-10">
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
        <div className="grid grid-cols-2">
          <CategoriesTabs categories={categoriasData?.categorias!}>
            <div className="grid grid-cols-4 mx-auto gap-5  ">
              {data.productos.map((producto) => (
                <MenuItem
                  producto={producto}
                  key={producto.id}
                  producto_eliminado={productoEliminado}
                />
              ))}
            </div>
          </CategoriesTabs>

          <div className="flex flex-col">
            <h5 className="text-center font-bold text-2xl mb-10">Orden</h5>
            {pedidos.length > 0 ? (
              <>
                <ul>
                  {pedidos.map((pedido) => (
                    <li>
                      <div className="grid grid-cols-6 justify-between gap-20 space-y-3 max-w-[800px] mx-20">
                        <span>{pedido.cantidad}</span>
                        <span className="col-span-3 text-lg">
                          {pedido.nombre}
                        </span>
                        <span>${pedido.precio}</span>
                        <MdDeleteForever
                          color="red"
                          className="cursor-pointer"
                          size={22}
                          onClick={() => {
                            removePedido(pedido.producto_id);
                            setProductoEliminado(pedido.producto_id);
                            setTimeout(() => {
                              setProductoEliminado("");
                            }, 200);
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end  w-max-[100px]  items-center px-20 mt-10">
                  <span className="text-xl ">Total:</span>
                  <p className="font-bold text-xl">
                    $
                    {pedidos.reduce(
                      (acc, item) => acc + item.cantidad * item.precio,
                      0,
                    )}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-center font-semibold mt-20">
                  No se ha agregado nada a la Orden
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default Menu;
