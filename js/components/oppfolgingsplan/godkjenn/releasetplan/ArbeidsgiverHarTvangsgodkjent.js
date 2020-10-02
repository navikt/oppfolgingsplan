import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import getContextRoot from '../../../../utils/getContextRoot';
import {
    dokumentReducerPt,
    oppfolgingsplanPt,
} from '../../../../propTypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';

const texts = {
    getDocumentFailet: 'Beklager, vi kunne ikke hente dokumentet på dette tidspunktet. Prøv igjen senere!',
    title: 'Lederen din har laget en oppfølgingsplan',
    paragraphInfo: 'Hvis du er uenig i innholdet, må du snakke med lederen din.',
    ekspanderbarTitle: 'Se planen',
    buttonConfirm: 'Videre',
};

class ArbeidsgiverHarTvangsgodkjent extends Component {
    componentWillMount() {
        if (!this.props.dokument.hentet && !this.props.dokument.henter && this.props.dokument.id !== this.props.oppfolgingsdialog.id) {
            this.props.hentPdfurler(this.props.oppfolgingsdialog.id, 1);
        }
    }

    render() {
        const {
            dokument,
            markerMottattTvungenGodkjenning,
        } = this.props;

        let panel;
        if (dokument.henter) {
            panel = <div className="app-spinner" aria-label="Vent litt mens siden laster" />;
        } else if (dokument.hentingFeilet) {
            panel = (<div className="godkjentPlanPdf__feilmelding">
                {texts.getDocumentFailet}
            </div>);
        } else {
            panel = dokument.data && dokument.data.map((url, idx) => {
                return (
                    <div className="godkjentPlanPdf__dokument" key={idx}>
                        <img className="godkjentPlanPdf__side" src={url} alt="godkjentplan" type="application/pdf" />
                    </div>
                );
            });
        }
        return (
            <OppfolgingsplanInnholdboks
                liteikon
                svgUrl={`${getContextRoot()}/img/svg/varseltrekant.svg`}
                svgAlt="godkjent"
                tittel={texts.title}
            >
                <div className="arbeidsgiverHarTvangsgodkjent">
                    <p>{texts.paragraphInfo}</p>
                    <Ekspanderbartpanel border tittel={texts.ekspanderbarTitle}>
                        <div className="godkjentPlanPdf">
                            { panel }
                        </div>
                    </Ekspanderbartpanel>

                    <div className="knapperad">
                        <div className="knapperad__element">
                            <Hovedknapp onClick={markerMottattTvungenGodkjenning}>
                                {texts.buttonConfirm}
                            </Hovedknapp>
                        </div>
                    </div>
                </div>
            </OppfolgingsplanInnholdboks>);
    }
}

ArbeidsgiverHarTvangsgodkjent.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    markerMottattTvungenGodkjenning: PropTypes.func,
    dokument: dokumentReducerPt,
    hentPdfurler: PropTypes.func,
};

export default ArbeidsgiverHarTvangsgodkjent;

