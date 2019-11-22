import React from 'react';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { finnNyesteGodkjenning } from '../../../../utils/oppfolgingsdialogUtils';
import GodkjennPlanOversiktInformasjon from '../godkjenn/GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';

const texts = {
    godkjennPlanSendtInfoTekst: {
        title: 'Hva skjer nå?',
        paragraph: 'Når arbeidsgiveren din har godkjent den nye planen, vil du få muligheten til å laste den ned.',
    },
    godkjennPlanSendtUtvidbar: {
        title: 'Se planen',
    },
    godkjennPlanSendt: {
        title: 'Sendt til godkjenning',
        buttonUndo: 'Avbryt planen',
    },
};

const GodkjenPlanSentBlokk = (narmestelederName) => {
    const text = 'Du har sendt en ny versjon av oppfølgingsplanen til din arbeidsgiver ';
    return (
        <div className="blokk">
            <p>
                {text}<b>{narmestelederName}</b>
            </p>
        </div>
    );
};

export const GodkjennPlanSendtInfoTekst = () => {
    return (
        <div className="godkjennPlanSendt_infoTekst">
            <h3 className="typo-element">{texts.godkjennPlanSendtInfoTekst.title}</h3>
            <p>{texts.godkjennPlanSendtInfoTekst.paragraph}</p>
        </div>
    );
};

export const GodkjennPlanSendtUtvidbar = ({ oppfolgingsdialog, rootUrl }) => {
    return (
        <Utvidbar tittel={texts.godkjennPlanSendtUtvidbar.title}>
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsdialog}
                rootUrl={rootUrl}
            />
        </Utvidbar>
    );
};
GodkjennPlanSendtUtvidbar.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
};

const GodkjennPlanSendt = ({ oppfolgingsdialog, nullstillGodkjenning, rootUrl, rootUrlPlaner }) => {
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/hake-groenn--lys.svg`}
            liteikon
            svgAlt="sendt"
            tittel={texts.godkjennPlanSendt.title}
        >
            <div className="godkjennPlanSendt">
                {GodkjenPlanSentBlokk(oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn)}

                <GodkjennPlanTidspunkt
                    rootUrl={rootUrl}
                    gyldighetstidspunkt={finnNyesteGodkjenning(oppfolgingsdialog.godkjenninger).gyldighetstidspunkt}
                />

                <GodkjennPlanSendtUtvidbar
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrl={rootUrl}
                />
                <TidligereAvbruttePlaner
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrlPlaner={rootUrlPlaner}
                />
                <GodkjennPlanSendtInfoTekst
                    oppfolgingsdialog={oppfolgingsdialog}
                />
                <button
                    className="lenke"
                    onClick={() => {
                        nullstillGodkjenning(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
                    }}>
                    {texts.godkjennPlanSendt.buttonUndo}
                </button>
            </div>
        </OppfolgingsplanInnholdboks>
    );
};
GodkjennPlanSendt.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    nullstillGodkjenning: PropTypes.func,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default GodkjennPlanSendt;
