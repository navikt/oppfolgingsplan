import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanOversiktInformasjon from '../godkjenn/GodkjennPlanOversiktInformasjon';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanTilAltinnTekst from './GodkjennPlanTilAltinnTekst';
import { EditButton } from './EditButton';
import { SharingCheckbox } from './SharingCheckbox';

const texts = {
    godkjennPlanMottattUtvidbar: {
        title: 'Se planen',
    },
    godkjennPlanMottattKnapper: {
        buttonApprove: 'Godkjenn',
    },
    godkjennPlanMottatt: {
        title: 'Ønsker du å godkjenne denne versjonen?',
    },
    delMedNav: 'Del planen med NAV',
    preDelMedNav: 'Planen vil bli delt med NAV når du har godkjent den.',
};

const TextReceived = ({ leaderName }) => {
    return (
        <React.Fragment>
            Du har mottatt en ny oppfølgingsplan fra din arbeidsgiver: <b>{leaderName}</b> for godkjenning.
        </React.Fragment>
    );
};
TextReceived.propTypes = {
    leaderName: PropTypes.string,
};

export const GodkjennPlanMottattUtvidbar = ({ oppfolgingsdialog, rootUrl }) => {
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={texts.godkjennPlanMottattUtvidbar.title}>
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsdialog}
                rootUrl={rootUrl}
            />
        </Utvidbar>
    );
};

GodkjennPlanMottattUtvidbar.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
};
export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsdialog }) => {
    const [delMedNav, setDelMedNav] = useState(false);

    const handleChange = () => {
        setDelMedNav(!delMedNav);
    };

    return (
        <div className="knapperad knapperad--justervenstre">
            <SharingCheckbox checked={delMedNav} onChange={handleChange} oppfolgingsplan={oppfolgingsdialog} />
            <div className="knapperad__element">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => {
                        godkjennPlan(oppfolgingsdialog.id, null, true, delMedNav);
                    }}>
                    {texts.godkjennPlanMottattKnapper.buttonApprove}
                </Hovedknapp>
            </div>
        </div>
    );
};
GodkjennPlanMottattKnapper.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    godkjennPlan: PropTypes.func,
};

const GodkjennPlanMottatt = (
    {
        oppfolgingsdialog,
        rootUrl,
        rootUrlPlaner,
        godkjennPlan,
        avvisDialog,
    }) => {
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt.svg`}
            svgAlt="mottatt"
            tittel={texts.godkjennPlanMottatt.title}
        >
            <div className="godkjennPlanMottatt">
                <div className="blokk">
                    <p>
                        <TextReceived leaderName={oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn} />
                    </p>
                </div>

                <div className="blokk--xxs">
                    <GodkjennPlanTidspunkt
                        rootUrl={rootUrl}
                        gyldighetstidspunkt={oppfolgingsdialog.godkjenninger[0].gyldighetstidspunkt}
                    />
                </div>
                <GodkjennPlanMottattUtvidbar
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrl={rootUrl}
                />
                <EditButton
                    oppfolgingsdialog={oppfolgingsdialog}
                    avvisDialog={avvisDialog}
                />
                <TidligereAvbruttePlaner
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrlPlaner={rootUrlPlaner}
                />

                <GodkjennPlanTilAltinnTekst />

                <GodkjennPlanMottattKnapper
                    oppfolgingsdialog={oppfolgingsdialog}
                    godkjennPlan={godkjennPlan}
                    avvisDialog={avvisDialog}
                />
            </div>
        </OppfolgingsplanInnholdboks>
    );
};

GodkjennPlanMottatt.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
    avvisDialog: PropTypes.func,
    godkjennPlan: PropTypes.func,
};

export default GodkjennPlanMottatt;
