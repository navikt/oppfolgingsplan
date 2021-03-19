import React from 'react';
import Panel from 'nav-frontend-paneler';
import Video from '../app/Video';
import { OPPFOLGINGSPLAN } from '../../enums/filmer';

const texts = {
  title: 'Om oppfølgingsplanen',
  link:
    'https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/oppfolgingsplan_kap',
};

const TextLink = () => {
  return (
    <React.Fragment>
      Har du noen spørsmål?{' '}
      <a
        className="lenke"
        target="_blank"
        rel="noopener noreferrer"
        href={texts.link}
      >
        Les gjerne mer om oppfølgingsplanen her
      </a>
      .
    </React.Fragment>
  );
};

const OppfolgingsplanFilm = () => {
  return (
    <Panel>
      <h2 className="panel__tittel">{texts.title}</h2>
      <Video film={OPPFOLGINGSPLAN} />
      <p>
        <TextLink />
      </p>
    </Panel>
  );
};

export default OppfolgingsplanFilm;
