"use client";

import { createContext, useContext, useState } from "react";

import { ArbeidsoppgaverForm } from "../schema/ArbeidsoppgaverFormSchema";
import { TiltakForm } from "../schema/tiltakFormSchema";
import {
  OppfolgingsplanInnhold,
  InnholdInProgress,
  Oppfolgingsplan,
} from "./types";
import { EvalueringForm } from "../schema/EvalueringFormSchema";
import { useLocalStorageStoreSync } from "./useLocalStorageSync";

export enum SykmeldtTilstand {
  IKKE_SYKMELDT = "IKKE_SYKMELDT",
  SYKMELDT = "SYKMELDT",
}

interface PrototypeStore {
  innholdInProgress: InnholdInProgress;
  utkast: OppfolgingsplanInnhold | null;
  planer: Oppfolgingsplan[];
  datoForOppfolging?: Date;
  blePlanNettoppOpprettet: boolean;
  sykmeldtTilstand: SykmeldtTilstand;
  isFirstTimeMakingPlan: boolean; // Derived: true når ingen planer finnes ennå
  getPlanById: (oppfolgingsplanId: number) => Oppfolgingsplan | null;
  getSistePlan: () => Oppfolgingsplan | null;
  updateArbeidsoppgaver: (arbeidsoppgaver: ArbeidsoppgaverForm) => void;
  updateTiltak: (tiltak: TiltakForm) => void;
  updateEvaluering: (tiltak: EvalueringForm) => void;
  updateDelingForPlanInProgress: (
    skalDelesMedLege: boolean,
    skalDelesMedNav: boolean
  ) => void;
  lagreUtkast: () => void;
  opprettNyPlan: () => void;
  delPlanMedLege: (oppfolgingsplanId: number) => void;
  delSistePlanMedLege: () => void;
  delPlanMedNav: (oppfolgingsplanId: number) => void;
  delSistePlanMedNav: () => void;
  settDatoForOppfolging: (tidspunkt: Date) => void;
  resetPlanBleNettoppOpprettet: () => void;
  toggleSykmeldtTilstand: () => void;
  resetStore: () => void;
}

export const PrototypeStoreContext = createContext<PrototypeStore | undefined>(
  undefined
);

const emptyPlanInProgress: InnholdInProgress = {
  arbeidsoppgaver: {
    typiskArbeidshverdag: "",
    arbeidsoppgaverSomKanUtfores: "",
    arbeidsoppgaverSomIkkeKanUtfores: "",
  },
  tiltak: {
    tidligereTilpasning: "",
    tilpasningFremover: "",
    annenTilpasning: "",
    andreTiltak: "",
  },
  evaluering: {
    tilleggsinformasjon: "",
    hvordanFolgeOpp: "",
    harDenAnsatteMedvirket: "ja",
    denAnsatteHarIkkeMedvirketBegrunnelse: "",
    evalueringDato: null,
    onskerPaminnelseOmEvaluering: "nei",
  },
  skalDelesMedLege: false,
  skalDelesMedNav: false,
};
function getEmptyStore() {
  return {
    planer: [],
    utkast: null,
    innholdInProgress: structuredClone(emptyPlanInProgress),
    datoForOppfolging: undefined,
    blePlanNettoppOpprettet: false,
    sykmeldtTilstand: SykmeldtTilstand.SYKMELDT,
  };
}

export default function PrototypeStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{
    planer: Oppfolgingsplan[];
    utkast: OppfolgingsplanInnhold | null;
    innholdInProgress: InnholdInProgress;
    datoForOppfolging?: Date;
    blePlanNettoppOpprettet: boolean;
    sykmeldtTilstand: SykmeldtTilstand;
  }>(getEmptyStore());

  const nPlans = state.planer.length;

  const { clearLocalStorage } = useLocalStorageStoreSync(state, setState);

  function getSistePlan(): Oppfolgingsplan | null {
    return nPlans > 0 ? state.planer[nPlans - 1] : null;
  }

  const isFirstTimeMakingPlan = nPlans === 0;

  function getSistePlanId(): number | undefined {
    const sistePlan = getSistePlan();
    return sistePlan ? sistePlan.id : undefined;
  }

  function getPlanById(oppfolgingsplanId: number): Oppfolgingsplan | null {
    return state.planer.find((plan) => plan.id === oppfolgingsplanId) ?? null;
  }

  function updateArbeidsoppgaver(arbeidsoppgaver: ArbeidsoppgaverForm) {
    setState((prev) => ({
      ...prev,
      innholdInProgress: {
        ...prev.innholdInProgress,
        arbeidsoppgaver,
      },
    }));
  }

  function updateTiltak(tiltak: TiltakForm) {
    setState((prev) => ({
      ...prev,
      innholdInProgress: {
        ...prev.innholdInProgress,
        tiltak,
      },
    }));
  }

  function updateEvaluering(evaluering: EvalueringForm) {
    setState((prev) => ({
      ...prev,
      innholdInProgress: {
        ...prev.innholdInProgress,
        evaluering,
      },
    }));
  }

  function updateDelingForPlanInProgress(
    skalDelesMedLege: boolean,
    skalDelesMedNav: boolean
  ) {
    setState((prev) => ({
      ...prev,
      innholdInProgress: {
        ...prev.innholdInProgress,
        skalDelesMedLege,
        skalDelesMedNav,
      },
    }));
  }

  function lagreUtkast() {
    if (!state.innholdInProgress) {
      return;
    }
    setState((prev) => ({
      ...prev,
      utkast: structuredClone(prev.innholdInProgress),
    }));
  }

  function opprettNyPlan() {
    const nyPlanInnhold: OppfolgingsplanInnhold = {
      arbeidsoppgaver: { ...state.innholdInProgress.arbeidsoppgaver },
      tiltak: { ...state.innholdInProgress.tiltak },
      evaluering: { ...state.innholdInProgress.evaluering },
    };

    const id = nPlans + 1;

    const nyPlan = new Oppfolgingsplan({
      id,
      innhold: nyPlanInnhold,
      opprettetDato: new Date(),
    });

    setState((prev) => ({
      ...prev,
      planer: [...prev.planer, nyPlan],
      innholdInProgress: structuredClone(emptyPlanInProgress),
      utkast: null,
      blePlanNettoppOpprettet: true,
    }));
  }

  function delPlanMedLege(oppfolgingsplanId: number) {
    const oppfolgingsplan = getPlanById(oppfolgingsplanId);
    if (!oppfolgingsplan) {
      return;
    }

    oppfolgingsplan.delMedLege();

    setState((prev) => ({
      ...prev,
    }));
  }

  function delSistePlanMedLege() {
    const sistePlanId = getSistePlanId();
    if (!sistePlanId) {
      return;
    }
    delPlanMedLege(sistePlanId);
  }

  function delPlanMedNav(oppfolgingsplanId: number) {
    const oppfolgingsplan = getPlanById(oppfolgingsplanId);
    if (!oppfolgingsplan) {
      return;
    }

    oppfolgingsplan.delMedNav();

    setState((prev) => ({
      ...prev,
    }));
  }

  function delSistePlanMedNav() {
    const sistePlanId = getSistePlanId();
    if (!sistePlanId) {
      return;
    }
    delPlanMedNav(sistePlanId);
  }

  function settDatoForOppfolging(dato: Date) {
    setState((prev) => ({ ...prev, datoForOppfolging: dato }));
  }

  function resetPlanBleNettoppOpprettet() {
    setState((prev) => ({
      ...prev,
      blePlanNettoppOpprettet: false,
    }));
  }

  function toggleSykmeldtTilstand() {
    setState((prev) => ({
      ...prev,
      sykmeldtTilstand:
        prev.sykmeldtTilstand === SykmeldtTilstand.SYKMELDT
          ? SykmeldtTilstand.IKKE_SYKMELDT
          : SykmeldtTilstand.SYKMELDT,
    }));
  }

  function resetStore() {
    clearLocalStorage();
    setState(getEmptyStore());
  }

  return (
    <PrototypeStoreContext.Provider
      value={{
        innholdInProgress: state.innholdInProgress,
        utkast: state.utkast,
        planer: state.planer,
        datoForOppfolging: state.datoForOppfolging,
        sykmeldtTilstand: state.sykmeldtTilstand,
        isFirstTimeMakingPlan,
        blePlanNettoppOpprettet: state.blePlanNettoppOpprettet,
        getSistePlan,
        getPlanById,
        updateArbeidsoppgaver,
        updateTiltak,
        updateEvaluering,
        updateDelingForPlanInProgress,
        lagreUtkast,
        opprettNyPlan,
        delPlanMedLege,
        delSistePlanMedLege,
        delPlanMedNav,
        delSistePlanMedNav,
        settDatoForOppfolging,
        resetPlanBleNettoppOpprettet,
        toggleSykmeldtTilstand,
        resetStore,
      }}
    >
      {children}
    </PrototypeStoreContext.Provider>
  );
}

export const usePrototypeStore = () => {
  const context = useContext(PrototypeStoreContext);
  if (!context) {
    throw new Error(
      "useOppfolgingsplanContext must be used within an OppfolgingsplanProvider"
    );
  }
  return context;
};
