import React from 'react';
import PropTypes from 'prop-types';
import {
    getHtmlLedetekst,
    getLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { finnNyesteGodkjenning } from '../../../../utils/oppfolgingsdialogUtils';
import GodkjennPlanOversiktInformasjon from '../godkjenn/GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';

export const GodkjennPlanSendtInfoTekst = () => {
    return (
        <div className="godkjennPlanSendt_infoTekst">
            <h3 className="typo-element">{getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.sendt.infotekst.tittel')}</h3>
            <p dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.sendt.infotekst.tekst')} />
        </div>
    );
};

export const GodkjennPlanSendtUtvidbar = ({ oppfolgingsdialog, rootUrl }) => {
    return (
        <Utvidbar tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.sendt.utvidbar.tittel')}>
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
    const infoboksTittelNokkel = 'oppfolgingsdialog.arbeidstaker.godkjennplan.sendt.infoboks.tittel';
    const infoboksTekst = getHtmlLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.sendt.infoboks.tekst.html', {
        '%ARBEIDSGIVER%': oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn,
    });
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/hake-groenn--lys.svg`}
            liteikon
            svgAlt="sendt"
            tittel={getLedetekst(infoboksTittelNokkel)}
        >
            <div className="godkjennPlanSendt">
                <div className="blokk">
                    <p dangerouslySetInnerHTML={infoboksTekst} />
                </div>

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
                    {getLedetekst('oppfolgingsdialog.knapp.avbryt-planen')}
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
