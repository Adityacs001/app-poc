import create from "zustand";
import produce from "immer";

const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

const useStore = create(
  immer((set) => ({
    locale: 0,
    changelocale: (newlocale) => set((state) => ({ locale: newlocale })),
  })),
);

const languageSelector = (state) => (state.locale === 0 ? "en" : "ae");

export default useStore;
export { languageSelector };
