import { atom } from "jotai";

type User = {
  id: string;
};
export const appAtom = atom<User | null>(null);

export const languageAtom = atom(
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string
);
