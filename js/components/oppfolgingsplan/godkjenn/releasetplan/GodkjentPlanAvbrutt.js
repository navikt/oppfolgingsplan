import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'nav-frontend-paneler';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import {
    finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
    finnSistEndretAvNavn,
} from '../../../../utils/oppfolgingsdialogUtils';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsplanPt,
} from '../../../../propTypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import GodkjentPlanAvbruttTidspunkt from './GodkjentPlanAvbruttTidspunkt';
import getContextRoot from '../../../../utils/getContextRoot';
import { ButtonDownload } from './GodkjentPlanHandlingKnapper';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import PlanEkspanderbar from '../PlanEkspanderbar';

const texts = {
    linkActivePlan: 'Tilbake til den gjeldende utgave',
    title: 'Tidligere oppfølgingsplan',
};

const textChangeBy = (personName, date) => {
    return `Denne oppfølgingsplanen ble åpnet for endring av ${personName} ${date}`;
};

class GodkjentPlanAvbrutt extends Component {
    render() {
        const {
            oppfolgingsdialog,
            oppfolgingsdialoger,
            delmednav,
            delMedNavFunc,
            fastlegeDeling,
            delMedFastlege,
            rootUrlPlaner,
        } = this.props;
        const aktivPlan = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(oppfolgingsdialoger, oppfolgingsdialog.virksomhet.virksomhetsnummer);
        return (
            <Panel border className="godkjentPlanAvbrutt">
                <div className="godkjentPlanAvbrutt_lenke">
                    { aktivPlan &&
                    <a
                        className="lenke"
                        href={`${rootUrlPlaner}/oppfolgingsplaner/${aktivPlan.id}`}>
                        {texts.linkActivePlan}
                    </a>
                    }
                </div>
                <OppfolgingsplanInnholdboks
                    svgUrl={`${getContextRoot()}/img/svg/plan-avbrutt.svg`}
                    svgAlt=""
                    tittel={texts.title}
                >
                    <div className="godkjentPlanAvbrutt">
                        <GodkjentPlanAvbruttTidspunkt
                            oppfolgingsplan={oppfolgingsdialog}
                        />
                        <GodkjentPlanDeltBekreftelse
                            oppfolgingsplan={oppfolgingsdialog}
                        />
                        <p>
                            {textChangeBy(finnSistEndretAvNavn(oppfolgingsdialog), toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.avbruttPlan.tidspunkt))}
                        </p>
                        <PlanEkspanderbar
                            oppfolgingsplan={oppfolgingsdialog}
                        />
                        {isGodkjentPlanDelKnapperAvailable(oppfolgingsdialog) && <GodkjentPlanDelKnapper
                            className="godkjentPlanAvbruttDelKnapper"
                            oppfolgingsplan={oppfolgingsdialog}
                            delmednav={delmednav}
                            delMedNavFunc={delMedNavFunc}
                            fastlegeDeling={fastlegeDeling}
                            delMedFastlege={delMedFastlege}
                        />
                        }
                        <div className="knapperad knapperad--justervenstre">
                            <ButtonDownload
                                oppfolgingsplan={oppfolgingsdialog}
                            />
                        </div>
                    </div>
                </OppfolgingsplanInnholdboks>
            </Panel>
        );
    }
}

GodkjentPlanAvbrutt.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
    delmednav: delmednavPt,
    delMedNavFunc: PropTypes.func,
    fastlegeDeling: delMedFastlegePt,
    delMedFastlege: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default GodkjentPlanAvbrutt;
