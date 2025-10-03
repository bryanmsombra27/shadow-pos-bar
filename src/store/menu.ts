import { create } from "zustand";

interface MenuItem {
  producto_id: string;
  cantidad: number;
  precio: number;
}

interface InitialState {
  pedidos: MenuItem[];
}

interface Actions {
  setPedido: (productId: string, qty: number, price: number) => void;
  clearPerdidos: () => void;
}

type State = InitialState & Actions;

export const useMenuStore = create<State>()((set, get) => ({
  pedidos: [],
  setPedido: (productId: string, qty: number, price: number) => {
    set((prevState) => {
      // const alreadyInCart = prevState.pedidos.find()
      const index = prevState.pedidos.findIndex(
        (pedido) => pedido.producto_id == productId
      );

      let newPedidos = [];

      if (index >= 0) {
        newPedidos = prevState.pedidos.map((pedido) => {
          if (pedido.producto_id == productId) {
            return {
              ...pedido,
              cantidad: pedido.cantidad + qty,
            };
          }

          return pedido;
        });

        if (qty == 0) {
          newPedidos = prevState.pedidos.filter(
            (pedido) => pedido.producto_id != productId
          );
        }
      } else {
        newPedidos = [
          ...prevState.pedidos,
          { cantidad: qty, producto_id: productId, precio: price },
        ];
      }

      return {
        pedidos: newPedidos,
      };
    });
  },
  clearPerdidos: () => {
    set({
      pedidos: [],
    });
  },
}));
