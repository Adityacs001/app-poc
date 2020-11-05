import create from "zustand";
import produce from "immer";

const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

const useStore = create(
  immer((set) => ({
    locale: 0,
    sampleCounter: () => set((state) => ({ locale: state.locale + 1 })),
  })),
);

const languageSelector = (state) => state.locale;

export default useStore;
export { languageSelector };
