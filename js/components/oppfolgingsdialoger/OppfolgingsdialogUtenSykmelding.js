import React from 'react';
import getContextRoot from '../../utils/getContextRoot';

const texts = {
    title: 'Aktiv oppfølgingsplan',
    info: 'Du kan ikke lage en ny oppfølgingsplan fordi du ikke har en aktiv sykmelding på dette tidspunktet.',
};

const OppfolgingsdialogUtenSykmelding = () => {
    return (<div className="oppfolgingsdialogUtenAktivSykmelding">
        <header className="oppfolgingsdialogUtenAktivSykmelding__header">
            <h2>{texts.title}</h2>
        </header>
        <div className="oppfolgingsdialogUtenAktivSykmelding__blokk">
            <img alt="ikke-aktiv-sykmeldt" src={`${getContextRoot()}/img/svg/oppfolgingsdialog-illustrasjon-ikke-aktiv-sykmelt.svg`} />
            <div className="inngangspanel__innhold">
                <div>
                    <p className="oppfolgingsdialoger__start_tekst">
                        {texts.info}
                    </p>
                </div>
            </div>
        </div>
    </div>);
};

export default OppfolgingsdialogUtenSykmelding;

