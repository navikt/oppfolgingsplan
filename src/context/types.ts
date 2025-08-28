import { ArbeidsoppgaverForm } from "../schema/ArbeidsoppgaverFormSchema";
import { EvalueringForm } from "../schema/EvalueringFormSchema";
import { TiltakForm } from "../schema/tiltakFormSchema";

export interface OppfolgingsplanInnhold {
  arbeidsoppgaver: ArbeidsoppgaverForm;
  tiltak: TiltakForm;
  evaluering: EvalueringForm;
  // varighet: EvalueringForm;
  // sluttDato: Date | null;
}

export interface InnholdInProgress extends OppfolgingsplanInnhold {
  skalDelesMedLege: boolean;
  skalDelesMedNav: boolean;
}

export interface IOppfolgingsplan {
  id: number;
  innhold: OppfolgingsplanInnhold;
  opprettetDato: Date;
  deltMedLegeDato?: Date;
  deltMedNavDato?: Date;
}

export class Oppfolgingsplan {
  id: number;
  innhold: OppfolgingsplanInnhold;
  opprettetDato: Date;
  deltMedLegeDato: Date | null;
  deltMedNavDato: Date | null;

  constructor({
    id,
    innhold,
    opprettetDato,
  }: {
    id: number;
    innhold: OppfolgingsplanInnhold;
    opprettetDato: Date;
  }) {
    this.id = id;
    this.innhold = innhold;
    this.opprettetDato = opprettetDato;
    this.deltMedLegeDato = null;
    this.deltMedNavDato = null;
  }

  get isDeltMedLege(): boolean {
    return this.deltMedLegeDato !== null;
  }

  delMedLege() {
    if (this.isDeltMedLege) {
      return;
    }
    this.deltMedLegeDato = new Date();
  }

  get isDeltMedNav(): boolean {
    return this.deltMedNavDato !== null;
  }

  delMedNav() {
    if (this.isDeltMedNav) {
      return;
    }
    this.deltMedNavDato = new Date();
  }
}
