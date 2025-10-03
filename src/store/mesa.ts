import { create } from "zustand";

interface InitialState {
  mesa_id: string;
}

interface Actions {
  setMesa: (id: string) => void;
}

type State = InitialState & Actions;

export const useMesaStore = create<State>()((set, get) => ({
  mesa_id: "",
  setMesa: (id) => {
    console.log("mesa para asignar", id);

    set({
      mesa_id: id,
    });
  },
}));
