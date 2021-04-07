import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import getContextRoot from '../../utils/getContextRoot';

const texts = {
  title: 'Aktiv oppfølgingsplan',
  info: 'Du kan ikke lage en ny oppfølgingsplan fordi du ikke er sykmeldt nå.',
};

const OppfolgingsdialogUtenSykmelding = () => {
  return (
    <div className="oppfolgingsdialogUtenAktivSykmelding">
      <header className="oppfolgingsdialogUtenAktivSykmelding__header">
        <h2>{texts.title}</h2>
      </header>
      <Panel border>
        <div className="oppfolgingsdialogUtenAktivSykmelding__blokk">
          <img alt="" src={`${getContextRoot()}/img/svg/oppfolgingsdialog-illustrasjon-ikke-aktiv-sykmelt.svg`} />
          <div className="inngangspanel__innhold">
            <div>
              <p className="oppfolgingsdialoger__start_tekst">{texts.info}</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default OppfolgingsdialogUtenSykmelding;
