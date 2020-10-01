import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '../../../../utils/oppfolgingsdialogUtils';
import GodkjennPlanOversiktInformasjon from '../godkjenn/GodkjennPlanOversiktInformasjon';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { EditButton } from './EditButton';
import { SharingCheckbox } from './SharingCheckbox';

const texts = {
    godkjennPlanMottattEkspanderbar: {
        title: 'Se planen',
    },
    godkjennPlanMottattKnapper: {
        buttonApprove: 'Godkjenn',
    },
    godkjennPlanAvslaattOgGodkjent: {
        title: 'Mottatt endring',
        paragraphInfoWho: ' har gjort noen endringer i planen og sendt den tilbake til deg.',
    },
    delMedNav: 'Del planen med NAV',
    preDelMedNav: 'Planen vil bli delt med NAV når du har godkjent den.',
};

export const GodkjennPlanMottattEkspanderbar = ({ oppfolgingsplan, rootUrl }) => {
    return (
        <Ekspanderbartpanel border tittel={texts.godkjennPlanMottattEkspanderbar.title}>
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsplan}
                rootUrl={rootUrl}
            />
        </Ekspanderbartpanel>
    );
};
GodkjennPlanMottattEkspanderbar.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
};

export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsplan }) => {
    const [delMedNav, setDelMedNav] = useState(false);

    const handleChange = () => {
        setDelMedNav(!delMedNav);
    };

    return (
        <div className="knapperad knapperad--justervenstre">
            <SharingCheckbox checked={delMedNav} onChange={handleChange} oppfolgingsplan={oppfolgingsplan} />
            <div className="knapperad__element">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => { godkjennPlan(oppfolgingsplan.id, null, true, delMedNav); }}>
                    {texts.godkjennPlanMottattKnapper.buttonApprove}
                </Hovedknapp>
            </div>
        </div>
    );
};
GodkjennPlanMottattKnapper.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    godkjennPlan: PropTypes.func,
};

const GodkjennPlanAvslaattOgGodkjent = (
    {
        oppfolgingsplan,
        rootUrl,
        godkjennPlan,
        avvisDialog,
    }) => {
    const sistOppfolgingsplan = oppfolgingsplan && hentGodkjenningsTidspunkt(oppfolgingsplan);
    return (<div className="godkjennPlanAvslaattOgGodkjent">
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt-igjen.svg`}
            svgAlt="mottatt"
            tittel={texts.godkjennPlanAvslaattOgGodkjent.title}
        >
            <div>
                <p>
                    {`${oppfolgingsplan.arbeidsgiver.naermesteLeder.navn}${texts.godkjennPlanAvslaattOgGodkjent.paragraphInfoWho}`}
                </p>

                <GodkjennPlanTidspunkt
                    rootUrl={rootUrl}
                    gyldighetstidspunkt={sistOppfolgingsplan}
                />
                <GodkjennPlanMottattEkspanderbar
                    oppfolgingsplan={oppfolgingsplan}
                    rootUrl={rootUrl}
                />
                <EditButton
                    oppfolgingsdialog={oppfolgingsplan}
                    avvisDialog={avvisDialog}
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
