import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { KANGJENNOMFOERES } from '../../../konstanter';
import { ArbeidsoppgaveVarselFeil } from './ArbeidsoppgaveVarselFeil';
import { arbeidsoppgavePt } from '../../../propTypes/opproptypes';

export const ArbeidsoppgaveInformasjonKnapper = ({ element, fnr, visLagreSkjema, sendSlett }) => {
    const elementId = element.arbeidsoppgaveId;
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        <div className="arbeidsoppgaveInformasjonKnapper knapperad knapperad--justervenstre">
            <button
                type="button"
                className={`${element.gjennomfoering ? 'knapp--endre' : 'knapp knapp--standard'} knapperad__element`}
                aria-pressed={visLagreSkjema}
                onClick={visLagreSkjema}>
                {element.gjennomfoering ?
                    getLedetekst('oppfolgingsdialog.knapp.endre-element')
                    :
                    getLedetekst('oppfolgingsdialog.knapp.givurdering')
                }
            </button>
            { aktoerHarOpprettetElement &&
            <button
                type="button"
                onClick={() => { sendSlett(elementId); }}
                className="knapperad__element knapp--slett">
                {getLedetekst('oppfolgingsdialog.knapp.slett-element')}
            </button>
            }
        </div>);
};
ArbeidsoppgaveInformasjonKnapper.propTypes = {
    element: arbeidsoppgavePt,
    fnr: PropTypes.string,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
};

export const ArbeidsoppgaveInformasjonInnhold = ({ arbeidsoppgave }) => {
    let beskrivelseTekst = '';
    let hentPanelType;
    switch (arbeidsoppgave && arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres) {
        case KANGJENNOMFOERES.KAN: {
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--groenn';
            break;
        }
        case KANGJENNOMFOERES.TILRETTELEGGING: {
            beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanBeskrivelse;
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--gul';
            break;
        }
        case KANGJENNOMFOERES.KAN_IKKE: {
            beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse;
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--roed';
            break;
        }
        default: {
            hentPanelType = 'arbeidsoppgaveInformasjonInnhold--graa';
            break;
        }
    }
    return (
        <div className={`arbeidsoppgaveInformasjonInnhold ${hentPanelType}`}>
            {!arbeidsoppgave.gjennomfoering &&
            <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.ikke-vurdert.arbeidstaker')}</p>
            }
            { arbeidsoppgave.gjennomfoering &&
            <dl>
                { arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING &&
                <dt>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging')}</dt>
                }
                { arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING &&
                <dd>
                    { arbeidsoppgave.gjennomfoering.paaAnnetSted &&
                    <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging.paaAnnetSted')}</p>
                    }
                    { arbeidsoppgave.gjennomfoering.medMerTid &&
                    <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging.medMerTid')}</p>
                    }
                    { arbeidsoppgave.gjennomfoering.medHjelp &&
                    <p>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.tilrettelegging.medHjelp')}</p>
                    }
                </dd>
                }

                { beskrivelseTekst.length > 0 && arbeidsoppgave.gjennomfoering.kanGjennomfoeres !== KANGJENNOMFOERES.KAN &&
                <dt>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.beskrivelse')}</dt>
                }
                { beskrivelseTekst.length > 0 && arbeidsoppgave.gjennomfoering.kanGjennomfoeres !== KANGJENNOMFOERES.KAN &&
                <dd className="arbeidsoppgaveInformasjonInnhold__beskrivelse">{beskrivelseTekst}</dd>
                }
                <dt>{getLedetekst('oppfolgingsdialoger.arbeidsoppgaveInformasjon.opprettetAv')}</dt>
                <dd>{arbeidsoppgave.opprettetAv.navn}</dd>
            </dl>
            }
        </div>);
};
ArbeidsoppgaveInformasjonInnhold.propTypes = {
    arbeidsoppgave: arbeidsoppgavePt,
};

const ArbeidsoppgaveInformasjon = (
    {
        element,
        fnr,
        visLagreSkjema,
        sendSlett,
        oppdateringFeilet,
        varselTekst,
        rootUrlImg,
    }) => {
    return (
        <div className={'arbeidsoppgaveInformasjon'}>
            <ArbeidsoppgaveInformasjonInnhold
                arbeidsoppgave={element}
            />

            { oppdateringFeilet &&
            <ArbeidsoppgaveVarselFeil
                tekst={varselTekst}
                rootUrlImg={rootUrlImg}
            />
            }

            <ArbeidsoppgaveInformasjonKnapper
                element={element}
                fnr={fnr}
                visLagreSkjema={visLagreSkjema}
                sendSlett={sendSlett}
            />
        </div>);
};

ArbeidsoppgaveInformasjon.propTypes = {
    element: arbeidsoppgavePt,
    fnr: PropTypes.string,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
    oppdateringFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    rootUrlImg: PropTypes.string,
};

export default ArbeidsoppgaveInformasjon;
