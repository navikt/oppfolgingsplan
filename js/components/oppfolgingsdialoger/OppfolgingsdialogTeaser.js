import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as opProptypes from '../../propTypes/opproptypes';
import {
    finnOppfolgingsdialogMotpartNavn,
} from '../../utils/oppfolgingsdialogUtils';
import { hentPlanStatus } from '../../utils/teaserUtils';

const OppfolgingsdialogTeaser = (
    {
        oppfolgingsdialog,
        rootUrl,
        rootUrlPlaner,
    }) => {
    const planStatus = hentPlanStatus(oppfolgingsdialog);
    return (<article aria-labelledby={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
        <Link className="inngangspanel oppfolgingsdialog" to={`${rootUrlPlaner}/oppfolgingsplaner/${oppfolgingsdialog.id}`}>
            <span className="oppfolgingsplanInnhold__ikon">
                <img alt="plan" src={`${rootUrl}/img/svg/${planStatus.img}`} />
            </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
                        <span className="inngangspanel__tittel">
                            {finnOppfolgingsdialogMotpartNavn(oppfolgingsdialog)}
                        </span>
                    </h3>
                </header>
                { typeof planStatus.tekst === 'object'
                    ? <p className="inngangspanel__tekst" dangerouslySetInnerHTML={planStatus.tekst} />
                    : <p className="inngangspanel__tekst" dangerouslySetInnerHTML={{ __html: planStatus.tekst }} />
                }
            </div>
        </Link>
    </article>);
};

OppfolgingsdialogTeaser.propTypes = {
    oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default OppfolgingsdialogTeaser;