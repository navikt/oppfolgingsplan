import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'nav-frontend-paneler';
import { restdatoTildato } from '../../../utils/datoUtils';
import { oppfolgingsplanPt } from '../../../propTypes/opproptypes';

const texts = {
    title: 'Tidligere utgaver av denne planen',
};

const textLink = (date) => {
    return `Oppfølgingsplanen endret ${date}`;
};

const TidligereAvbruttePlaner = ({ oppfolgingsdialog, rootUrlPlaner }) => {
    if (oppfolgingsdialog.avbruttPlanListe && oppfolgingsdialog.avbruttPlanListe.length > 0) {
        return (
            <Panel border className="tidligereAvbruttePlaner">
                <p>{texts.title}</p>
                <ul>
                    {
                        oppfolgingsdialog.avbruttPlanListe.map((avbruttPlan, idx) => {
                            return (<li key={idx}>
                                <a
                                    className="lenke"
                                    href={`${rootUrlPlaner}/oppfolgingsplaner/${avbruttPlan.id}/`}
                                >
                                    {textLink(restdatoTildato(avbruttPlan.tidspunkt))}
                                </a>
                            </li>);
                        })
                    }
                </ul>
            </Panel>
        );
    }
    return null;
};

TidligereAvbruttePlaner.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    rootUrlPlaner: PropTypes.string,
};

export default TidligereAvbruttePlaner;
