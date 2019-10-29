import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';

const OppfolgingsdialogUtenSykmelding = () => {
    return (<div className="oppfolgingsdialogUtenAktivSykmelding">
        <header className="oppfolgingsdialogUtenAktivSykmelding__header">
            <h2>{getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}</h2>
        </header>
        <div className="oppfolgingsdialogUtenAktivSykmelding__blokk">
            <img alt="ikke-aktiv-sykmeldt" src={`${getContextRoot()}/img/svg/oppfolgingsdialog-illustrasjon-ikke-aktiv-sykmelt.svg`} />
            <div className="inngangspanel__innhold">
                <div>
                    <p className="oppfolgingsdialoger__start_tekst">
                        {getLedetekst('oppfolgingsdialog.ikke.aktiv.sykmelding.tekst')}
                    </p>
                </div>
            </div>
        </div>
    </div>);
};

export default OppfolgingsdialogUtenSykmelding;

