import chai from 'chai';
import sinon from 'sinon';
import {
  erOppfolgingsplanOpprettbarDirekte,
  finnAktiveOppfolgingsdialoger,
  finnBrukersSisteInnlogging,
  finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
  finnNyesteTidligereOppfolgingsdialogMedVirksomhet,
  oppgaverOppfoelgingsdialoger,
} from '../../js/utils/oppfolgingsdialogUtils';
import { hentSykmeldingIkkeGyldigForOppfoelging, hentSykmeldingGyldigForOppfoelging } from '../mock/mockSykmeldinger';
import getOppfolgingsdialog, { hentOppfolgingsdialogTidligere } from '../mock/mockOppfolgingsdialoger';
import { leggTilDagerPaaDato, leggTilMnderOgDagerPaaDato, leggTilMnderPaaDato } from '../testUtils';
import { MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING } from '../../js/konstanter';

const expect = chai.expect;

describe('OppfolgingdialogUtils', () => {
  let klokke;
  let dagensDato = new Date('2017-01-01');

  beforeEach(() => {
    klokke = sinon.useFakeTimers(dagensDato.getTime());
  });

  afterEach(() => {
    klokke.restore();
  });

  describe('oppgaverOppfoelgingsdialoger', () => {
    let sykmeldingsykmeldingUgyldig;
    let sykmeldingGyldig;
    let oppfolgingsdialogUnderArbeid;

    beforeEach(() => {
      sykmeldingsykmeldingUgyldig = hentSykmeldingIkkeGyldigForOppfoelging(dagensDato);
      sykmeldingGyldig = hentSykmeldingGyldigForOppfoelging(dagensDato);
      oppfolgingsdialogUnderArbeid = {
        status: 'UNDER_ARBEID',
        virksomhet: {
          virksomhetsnummer: sykmeldingGyldig.organisasjonsinformasjon.orgnummer,
        },
        godkjenninger: [],
        sistEndretAv: {
          fnr: 'arbedsgiverFnr',
        },
      };
    });

    describe('med aktiv sykmelding', () => {
      it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
        expect(oppgaverOppfoelgingsdialoger([], [sykmeldingGyldig])).to.deep.equal({
          nyePlaner: [],
          avventendeGodkjenninger: [],
        });
      });

      it('Finner ny plan', () => {
        const dialog = {
          ...oppfolgingsdialogUnderArbeid,
          arbeidstaker: {
            fnr: 'fnr',
            sistInnlogget: null,
          },
        };
        expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
          nyePlaner: [dialog],
          avventendeGodkjenninger: [],
        });
      });

      it('Finner godkjent plan', () => {
        const dialog = {
          ...oppfolgingsdialogUnderArbeid,
          arbeidstaker: {
            fnr: 'fnr',
            sistInnlogget: new Date('2017-08-14'),
          },
          godkjenninger: [
            {
              godkjent: true,
              godkjentAv: {
                fnr: 'arbedsgiverFnr',
              },
            },
          ],
        };
        expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
          nyePlaner: [],
          avventendeGodkjenninger: [dialog],
        });
      });

      it('Ny og godkjent plan telles bare som en', () => {
        const dialog = {
          ...oppfolgingsdialogUnderArbeid,
          arbeidstaker: {
            fnr: 'fnr',
            sistInnlogget: null,
          },
          godkjenninger: [
            {
              godkjent: true,
              godkjentAv: {
                fnr: 'arbedsgiverFnr',
              },
            },
          ],
        };
        expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
          nyePlaner: [],
          avventendeGodkjenninger: [dialog],
        });
      });
    });

    describe('uten aktiv sykmelding', () => {
      it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
        expect(oppgaverOppfoelgingsdialoger([], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
          nyePlaner: [],
          avventendeGodkjenninger: [],
        });
      });

      it('Finner ikke ny plan', () => {
        const dialog = {
          ...oppfolgingsdialogUnderArbeid,
          arbeidstaker: {
            fnr: 'fnr',
            sistInnlogget: null,
          },
        };
        expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
          nyePlaner: [],
          avventendeGodkjenninger: [],
        });
      });

      it('Finner ikke godkjent plan', () => {
        const dialog = {
          ...oppfolgingsdialogUnderArbeid,
          arbeidstaker: {
            fnr: 'fnr',
            sistInnlogget: new Date('2017-08-14'),
          },
          godkjenninger: [
            {
              godkjent: true,
              godkjentAv: {
                fnr: 'arbedsgiverFnr',
              },
            },
          ],
        };
        expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
          nyePlaner: [],
          avventendeGodkjenninger: [],
        });
      });
    });
  });

  describe('erOppfolgingsplanOpprettbarDirekte', () => {
    let arbeidsgiver;
    let oppfolgingsdialogTidligere;
    let oppfolgingsdialogIkkeTidligere;

    beforeEach(() => {
      arbeidsgiver = {};
      oppfolgingsdialogTidligere = hentOppfolgingsdialogTidligere(dagensDato);
      oppfolgingsdialogIkkeTidligere = getOppfolgingsdialog({
        godkjentplan: null,
      });
    });

    it('Skal returneren false, om det er flere enn 1 AG og det er tidligere godkjent plan', () => {
      expect(erOppfolgingsplanOpprettbarDirekte([arbeidsgiver, arbeidsgiver], [oppfolgingsdialogTidligere])).to.equal(
        false
      );
    });

    it('Skal returneren false, om det kun er 1 AG og det er tidligere godkjent plan', () => {
      expect(erOppfolgingsplanOpprettbarDirekte([arbeidsgiver], [oppfolgingsdialogTidligere])).to.equal(false);
    });

    it('Skal returneren true, om det kun er 1 AG og det ikke er tidligere godkjent plan', () => {
      expect(erOppfolgingsplanOpprettbarDirekte([arbeidsgiver], [oppfolgingsdialogIkkeTidligere])).to.equal(true);
    });
  });

  describe('finnNyesteTidligereOppfolgingsdialogMedVirksomhet', () => {
    let oppfolgingsdialogTidligere;
    let oppfolgingsdialogIkkeTidligere;
    let virksomhet;

    beforeEach(() => {
      virksomhet = { virksomhetsnummer: '12345678' };
      oppfolgingsdialogTidligere = {
        ...hentOppfolgingsdialogTidligere(dagensDato),
        virksomhet,
      };
      oppfolgingsdialogIkkeTidligere = {
        ...getOppfolgingsdialog(),
        virksomhet,
        godkjentplan: null,
      };
    });

    it('Skal ikke returnere tidligere dialog med virksomhet, om det det er plan med virksomhet som ikker er tidligere godkjent', () => {
      expect(
        finnNyesteTidligereOppfolgingsdialogMedVirksomhet(
          [oppfolgingsdialogIkkeTidligere],
          virksomhet.virksomhetsnummer
        )
      ).to.equal(undefined);
    });

    it('Skal ikke returnere tidligere dialog med virksomhet, om det det er tidligere godkjente plan med annen virksomhet', () => {
      expect(finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogTidligere], '1')).to.equal(undefined);
    });

    it('Skal returnere tidligere dialog med virksomhet, om det det er tidligere godkjente plan med virksomhet', () => {
      expect(
        finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogTidligere], virksomhet.virksomhetsnummer)
      ).to.deep.equal(oppfolgingsdialogTidligere);
    });
  });

  describe('finnAktiveOppfolgingsdialoger', () => {
    let gyldighetstidspunktPassert;
    let gyldighetstidspunktIkkePassert;
    let sykmeldingUtgaatt;
    let sykmeldingAktiv;

    const virksomhet = {
      virksomhetsnummer: '12345678',
    };

    beforeEach(() => {
      dagensDato = new Date('2017-09-28');
      klokke = sinon.useFakeTimers(dagensDato.getTime());

      gyldighetstidspunktPassert = {
        tom: new Date('2017.09.26'),
      };
      gyldighetstidspunktIkkePassert = {
        tom: new Date('2017.12.15'),
      };
      sykmeldingUtgaatt = {
        organisasjonsinformasjon: {
          orgnummer: virksomhet.virksomhetsnummer,
        },
        sykmeldingsperioder: [
          {
            fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2)).toISOString(),
            tom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1)).toISOString(),
          },
          {
            fom: leggTilMnderPaaDato(dagensDato, -4).toISOString(),
            tom: leggTilMnderOgDagerPaaDato(dagensDato, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -1).toISOString(),
          },
        ],
      };
      sykmeldingAktiv = {
        organisasjonsinformasjon: {
          orgnummer: virksomhet.virksomhetsnummer,
        },
        sykmeldingsperioder: [
          {
            fom: leggTilMnderPaaDato(dagensDato, -4).toISOString(),
            tom: leggTilMnderOgDagerPaaDato(dagensDato, -2, -28).toISOString(),
          },
          {
            fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
            tom: leggTilDagerPaaDato(dagensDato, 35).toISOString(),
          },
        ],
      };
    });

    it('finnAktiveOppfolgingsdialoger 1', () => {
      const dialog = [
        {
          godkjentPlan: null,
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passer, om plan ikke er godkjent', () => {
      const dialog = [
        {
          godkjentPlan: null,
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passert', () => {
      const dialog = [
        {
          godkjentPlan: {
            gyldighetstidspunkt: gyldighetstidspunktIkkePassert,
          },
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt er passert', () => {
      const dialog = [
        {
          godkjentPlan: {
            gyldighetstidspunkt: gyldighetstidspunktPassert,
          },
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(0);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om det eksisterer en plan knyttet til gyldig sykmelding', () => {
      const sykmeldinger = [sykmeldingAktiv];
      const dialog = [
        {
          virksomhet,
          godkjentPlan: null,
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(1);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 0 planer, om det ikke eksisterer en plan knyttet til gyldig sykmelding', () => {
      const sykmeldinger = [sykmeldingUtgaatt];
      const dialog = [
        {
          virksomhet,
          godkjentPlan: null,
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(0);
    });

    it('finnAktiveOppfolgingsdialoger skal returnere 0 planer, om det eksisterer en godkjent plan knyttet til gyldig sykmelding', () => {
      const sykmeldinger = [sykmeldingAktiv];
      const dialog = [
        {
          virksomhet,
          godkjentPlan: {
            gyldighetstidspunkt: gyldighetstidspunktPassert,
          },
        },
      ];
      expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(0);
    });
  });

  describe('finnBrukersSisteInnlogging', () => {
    it('finnBrukersSisteInnlogging for arbeidsgiver', () => {
      const sisteInnloggingDato = new Date('2017-10-25T08:02:18');
      const dialoger = [
        {
          arbeidstaker: {
            sistInnlogget: '2017-10-25T08:02:18',
          },
        },
        {
          arbeidstaker: {
            sistInnlogget: '2017-10-24T08:02:18.075',
          },
        },
      ];
      const returnertInnlogging = finnBrukersSisteInnlogging(dialoger);
      expect(returnertInnlogging.getTime()).to.equal(sisteInnloggingDato.getTime());
    });
  });

  describe('finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging', () => {
    it('finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging skal returnere 1 dialog for SYKMELDT om ARBEIDSGIVER har AVBRUTT ', () => {
      const oppfolgingsdialoger = [
        {
          id: 403,
          status: 'AVBRUTT',
          godkjentPlan: {
            avbruttPlan: {
              av: {
                fnr: '1000006119492',
              },
              tidspunkt: '2017-10-25T07:54:23.467',
              id: 403,
            },
          },
          arbeidsgiver: {
            naermesteLeder: {
              fnr: '1000006119492',
              sistInnlogget: '2017-10-25T07:53:32.757',
            },
          },
          arbeidstaker: {
            fnr: '1000004284466',
            sistInnlogget: '2017-10-25T07:52:57.158',
          },
        },
        {
          id: 404,
          status: 'AKTIV',
          godkjentPlan: {
            avbruttPlan: null,
          },
          avbruttPlanListe: [
            {
              av: {
                fnr: '1000006119492',
              },
              tidspunkt: '2017-10-25T07:54:23.467',
              id: 403,
            },
          ],
          arbeidsgiver: {
            naermesteLeder: {
              fnr: '1000006119492',
              sistInnlogget: '2017-10-25T07:53:32.757',
            },
          },
          arbeidstaker: {
            fnr: '1000004284466',
            sistInnlogget: '2017-10-25T07:52:57.158',
          },
        },
      ];
      expect(finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger)).to.have.length(1);
    });
  });
});
