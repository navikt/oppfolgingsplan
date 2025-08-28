/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, SetStateAction, useEffect } from "react";
import { Oppfolgingsplan } from "./types";

const LOCAL_STORAGE_KEY = "prototypeStore";

function reviveOppfolgingsplan(obj: any): Oppfolgingsplan {
  const plan = new Oppfolgingsplan({
    id: obj.id,
    innhold: obj.innhold,
    opprettetDato: new Date(obj.opprettetDato),
  });
  plan.deltMedLegeDato = obj.deltMedLegeDato
    ? new Date(obj.deltMedLegeDato)
    : null;
  plan.deltMedNavDato = obj.deltMedNavDato
    ? new Date(obj.deltMedNavDato)
    : null;
  return plan;
}

function reviveOppfolgingsplanArray(arr: any[]): Oppfolgingsplan[] {
  return arr.map(reviveOppfolgingsplan);
}

export function useLocalStorageStoreSync<T>(
  state: T,
  setState: Dispatch<SetStateAction<T>>
) {
  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        parsed.planer = reviveOppfolgingsplanArray(parsed.planer);

        setState((prev: T) => ({
          ...prev,
          ...parsed,
        }));
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Function to clear localStorage for this key
  function clearLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return { clearLocalStorage };
}
