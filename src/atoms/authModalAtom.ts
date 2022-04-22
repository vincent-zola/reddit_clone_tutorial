// * ========== Imports ==========

import { atom } from "recoil";

// * ========== TS Types ==========

export interface AuthModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
}

// * ========== Atoms ==========

// An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:

const defaultModalState: AuthModalState = {
  open: false,
  view: "login"
};

export const authModalState = atom<AuthModalState> ({ 
    key: "authModalState",
    default: defaultModalState
})
