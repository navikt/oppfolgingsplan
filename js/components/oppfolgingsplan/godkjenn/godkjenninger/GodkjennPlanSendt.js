import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { finnNyesteGodkjenning } from '../../../../utils/oppfolgingsdialogUtils';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanVenterInfo from '../godkjenn/GodkjennPlanVenterInfo';
import PlanEkspanderbar from '../PlanEkspanderbar';

const texts = {
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

                <PlanEkspanderbar
                    oppfolgingsplan={oppfolgingsdialog}
                />
                <button
                    className="lenke lenke--avbryt"
                    onClick={() => {
                        nullstillGodkjenning(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
                    }}>
                    {texts.godkjennPlanSendt.buttonUndo}
                </button>
                <GodkjennPlanVenterInfo />
                <TidligereAvbruttePlaner
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrlPlaner={rootUrlPlaner}
                />
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
