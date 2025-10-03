import { create } from "zustand";

interface MenuItem {
  id: string;
  cantidad: number;
}

interface InitialState {
  pedidos: MenuItem[];
}

interface Actions {
  setPedido: (productId: string, qty: number) => void;
}

type State = InitialState & Actions;

export const useMenuStore = create<State>()((set, get) => ({
  pedidos: [],
  setPedido: (productId: string, qty: number) => {
    set((prevState) => {
      // const alreadyInCart = prevState.pedidos.find()
      const index = prevState.pedidos.findIndex(
        (pedido) => pedido.id == productId
      );

      let newPedidos = [];

      if (index >= 0) {
        newPedidos = prevState.pedidos.map((pedido) => {
          if (pedido.id == productId) {
            return {
              ...pedido,
              cantidad: pedido.cantidad + qty,
            };
          }

          return pedido;
        });

        if (qty == 0) {
          newPedidos = prevState.pedidos.filter(
            (pedido) => pedido.id != productId
          );
        }
      } else {
        newPedidos = [...prevState.pedidos, { cantidad: qty, id: productId }];
      }

      return {
        pedidos: newPedidos,
      };
    });
  },
}));
