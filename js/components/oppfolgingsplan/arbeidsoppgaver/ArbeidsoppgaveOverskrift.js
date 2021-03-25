import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { KANGJENNOMFOERES } from '../../../konstanter';
import { arbeidsoppgavePt } from '../../../propTypes/opproptypes';
import ArbeidsoppgaveInformasjonKnapper from './ArbeidsoppgaveInformasjonKnapper';

const texts = {
  hentArbeidsoppgaveUnderTekst: {
    kan: 'Kan gjennomføres som normalt',
    tilrettelegging: 'Kan gjennomføres med hjelp/hjelpemiddel',
    kanIkke: 'Kan ikke gjennomføres',
    ikkeVurdert: 'Ikke vurdert',
  },
};

export const hentArbeidsoppgaveIkon = (arbeidsoppgave, rootUrlImg) => {
  if (arbeidsoppgave.gjennomfoering) {
    if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN) {
      return `${rootUrlImg}/img/svg/hake-groenn.svg`;
    } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING) {
      return `${rootUrlImg}/img/svg/hake-oransje.svg`;
    } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE) {
      return `${rootUrlImg}/img/svg/kryss-roed.svg`;
    }
  }
  return `${rootUrlImg}/img/svg/advarsel.svg`;
};

export const hentArbeidsoppgaveUnderTekst = (arbeidsoppgave) => {
  if (arbeidsoppgave.gjennomfoering) {
    if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN) {
      return texts.hentArbeidsoppgaveUnderTekst.kan;
    } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING) {
      return texts.hentArbeidsoppgaveUnderTekst.tilrettelegging;
    } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE) {
      return texts.hentArbeidsoppgaveUnderTekst.kanIkke;
    }
  }
  return texts.hentArbeidsoppgaveUnderTekst.ikkeVurdert;
};

const ArbeidsoppgaveOverskriftImg = styled.div`
  display: flex;
  align-self: flex-start;
  flex-grow: 0;
`;

const ArbeidsoppgaveOverskrift = ({ fnr, arbeidsoppgave, lagreSkjema, visLagreSkjema, sendSlett, rootUrlImg }) => {
  return (
    <div className="arbeidsoppgaveTabellUtvidbarOverskrift">
      <div className="arbeidsoppgaverListe__kol">
        <ArbeidsoppgaveOverskriftImg>
          <img
            className="arbeidsoppgaveOverskrift__ikon"
            src={hentArbeidsoppgaveIkon(arbeidsoppgave, rootUrlImg)}
            alt=""
          />
        </ArbeidsoppgaveOverskriftImg>
        <div className="arbeidsoppgaveOverskrift__tekst">
          <p>{arbeidsoppgave.arbeidsoppgavenavn}</p>
          <p>{hentArbeidsoppgaveUnderTekst(arbeidsoppgave)}</p>
          <ArbeidsoppgaveInformasjonKnapper
            arbeidsoppgave={arbeidsoppgave}
            fnr={fnr}
            lagreSkjema={lagreSkjema}
            visLagreSkjema={visLagreSkjema}
            sendSlett={sendSlett}
          />
        </div>
      </div>
    </div>
  );
};

ArbeidsoppgaveOverskrift.propTypes = {
  fnr: PropTypes.string,
  arbeidsoppgave: arbeidsoppgavePt,
  lagreSkjema: PropTypes.bool,
  visLagreSkjema: PropTypes.func,
  sendSlett: PropTypes.func,
  rootUrlImg: PropTypes.string,
};

export default ArbeidsoppgaveOverskrift;
