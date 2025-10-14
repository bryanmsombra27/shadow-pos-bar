import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialState {
  token: string;
}

interface Actions {
  setToken: (token: string) => void;
}

type State = InitialState & Actions;

export const useTokenStore = create<State>()(
  persist(
    (set, get) => ({
      token: "",
      setToken: (token) => {
        set({
          token,
        });
      },
    }),
    { name: "auth" }
  )
);
