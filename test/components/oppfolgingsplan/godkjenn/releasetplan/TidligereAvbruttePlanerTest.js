import React from 'react';
import chai from 'chai';
import { mount } from 'enzyme';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import chaiEnzyme from 'chai-enzyme';
import TidligereAvbruttePlaner from '../../../../../js/components/oppfolgingsplan/godkjenn/TidligereAvbruttePlaner';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TidligereAvbruttePlaner', () => {
  let komponent;
  let oppfolgingsdialog;

  beforeEach(() => {
    oppfolgingsdialog = getOppfolgingsdialog({
      avbruttPlanListe: [
        {
          av: {
            navn: ' ',
            fnr: '11011011011',
            epost: null,
            tlf: null,
            sistInnlogget: null,
            samtykke: null,
            evaluering: null,
            stillinger: [],
          },
          tidspunkt: '2020-02-20T11:31:29.835',
          id: 3451,
        },
      ],
    });
    komponent = mount(<TidligereAvbruttePlaner oppfolgingsdialog={oppfolgingsdialog} />);
  });

  it('Skal vise Ekspanderbartpanel for TidligereAvbruttePlaner', () => {
    expect(komponent.find(Ekspanderbartpanel)).to.have.length(1);
  });
});
