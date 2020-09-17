import create from "zustand";
import produce from "immer";

const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

type User = {
  name: String;
};

interface State {
  user: User;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  setUser: (param: User) => void;
}

const useStore = create<State>(
  immer((set) => ({
    user: { name: "aditya" },
    isAuthenticated: false,
    setAuthenticated: (param: boolean) => set({ isAuthenticated: param }),
    setUser: (param: User) => set({ user: param }),
  })),
);

export default useStore;
