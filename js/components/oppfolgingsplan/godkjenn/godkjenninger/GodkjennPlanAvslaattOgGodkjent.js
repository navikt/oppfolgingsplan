import React from 'react';
import PropTypes from 'prop-types';
import {
    Knapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import {
    getLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '../../../../utils/oppfolgingsdialogUtils';
import GodkjennPlanOversiktInformasjon from '../godkjenn/GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';

export const GodkjennPlanMottattUtvidbar = ({ oppfolgingsplan, rootUrl }) => {
    const tittelNokkel = 'oppfolgingsdialog.arbeidstaker.godkjennplan.mottatt.utvidbar.tittel';
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={getLedetekst(tittelNokkel)}>
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsplan}
                rootUrl={rootUrl}
            />
        </Utvidbar>
    );
};
GodkjennPlanMottattUtvidbar.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
};

export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsplan, avvisDialog }) => {
    return (
        <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => { godkjennPlan(oppfolgingsplan.id, null, true, oppfolgingsplan.arbeidstaker.fnr); }}>
                    {getLedetekst('oppfolgingsdialog.godkjennPlanMottatt.knapp.godkjenn')}
                </Hovedknapp>
            </div>
            <div className="knapperad__element">
                <Knapp
                    onClick={() => {
                        avvisDialog(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
                    }}>
                    {getLedetekst('oppfolgingsdialog.godkjennPlanMottatt.knapp.avslaa')}
                </Knapp>
            </div>
        </div>
    );
};
GodkjennPlanMottattKnapper.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    godkjennPlan: PropTypes.func,
    avvisDialog: PropTypes.func,
};

const GodkjennPlanAvslaattOgGodkjent = (
    {
        oppfolgingsplan,
        rootUrl,
        godkjennPlan,
        avvisDialog,
    }) => {
    const infoboksTittelNokkel = 'oppfolgingsdialog.arbeidstaker.godkjennplan.mottatt.igjen.infoboks.tittel';
    const infoboksTekstNaar = getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.mottatt.igjen.infoboks.naar.tekst');

    const infoboksTekstHvem = getLedetekst('oppfolgingsdialog.arbeidstaker.godkjennplan.mottatt.igjen.infoboks.hvem.tekst', {
        '%ARBEIDSGIVER%': oppfolgingsplan.arbeidsgiver.naermesteLeder.navn,
    });

    const sistOppfolgingsplan = oppfolgingsplan && hentGodkjenningsTidspunkt(oppfolgingsplan);
    return (<div className="godkjennPlanAvslaattOgGodkjent">
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt-igjen.svg`}
            svgAlt="mottatt"
            tittel={getLedetekst(infoboksTittelNokkel)}
        >
            <div>
                <p>
                    {infoboksTekstNaar}<br />
                    {infoboksTekstHvem}
                </p>

                <GodkjennPlanTidspunkt
                    rootUrl={rootUrl}
                    gyldighetstidspunkt={sistOppfolgingsplan}
                />

                <GodkjennPlanMottattUtvidbar
                    oppfolgingsplan={oppfolgingsplan}
                    rootUrl={rootUrl}
                />
                <GodkjennPlanMottattKnapper
                    oppfolgingsplan={oppfolgingsplan}
                    godkjennPlan={godkjennPlan}
                    avvisDialog={avvisDialog}
                />
            </div>
        </OppfolgingsplanInnholdboks>
    </div>);
};

GodkjennPlanAvslaattOgGodkjent.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
    godkjennPlan: PropTypes.func,
    avvisDialog: PropTypes.func,
};

export default GodkjennPlanAvslaattOgGodkjent;
