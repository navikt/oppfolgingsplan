import { expect } from 'chai';
import sinon from 'sinon';
import * as actions from '../../js/actions/oppfolgingsplan/oppfolgingsdialog_actions';

describe('oppfolgingsdialoger_actions', () => {
  let clock;
  let dagensDato;
  beforeEach(() => {
    window = window || {};
    window.APP_SETTINGS = {
      OPPFOELGINGSDIALOGREST_ROOT:
        'http://tjenester.nav.no/oppfoelgingsdialog/api',
    };
    dagensDato = new Date('2017-01-01');
    clock = sinon.useFakeTimers(dagensDato.getTime());
  });

  afterEach(() => {
    clock.restore();
  });

  it('Skal ha en hentOppfolgingsdialoger()-funksjon som returnerer riktig action', () => {
    expect(actions.hentOppfolgingsdialoger()).to.deep.equal({
      type: actions.HENT_OPPFOLGINGSDIALOGER_FORESPURT,
    });
  });

  it('Skal ha en henterOppfolgingsdialoger()-funksjon som returnerer riktig action', () => {
    expect(actions.henterOppfolgingsdialoger()).to.deep.equal({
      type: actions.HENTER_OPPFOLGINGSDIALOGER,
    });
  });

  it('har en oppfolgingsdialogerHentet()-funksjon som returnerer riktig action', () => {
    expect(
      actions.oppfolgingsdialogerHentet([{ id: 12345, navn: 'Ole' }])
    ).to.deep.equal({
      type: actions.OPPFOLGINGSDIALOGER_HENTET,
      data: [{ id: 12345, navn: 'Ole' }],
    });
  });

  it('Skal ha en hentOppfolgingsdialogerFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.hentOppfolgingsdialogerFeilet()).to.deep.equal({
      type: actions.HENT_OPPFOLGINGSDIALOGER_FEILET,
    });
  });

  it('Skal ha en opprettOppfolgingsdialog()-funksjon som returnerer riktig action', () => {
    expect(actions.opprettOppfolgingsdialog('virksomhetsnummer')).to.deep.equal(
      {
        type: actions.OPPRETT_OPPFOLGINGSDIALOG_FORESPURT,
        virksomhetsnummer: 'virksomhetsnummer',
      }
    );
  });

  it('Skal ha en oppretterOppfolgingsdialog()-funksjon som returnerer riktig action', () => {
    expect(actions.oppretterOppfolgingsdialog()).to.deep.equal({
      type: actions.OPPRETTER_OPPFOLGINGSDIALOG,
    });
  });

  it('har en oppfolgingsdialogOpprettet()-funksjon som returnerer riktig action', () => {
    expect(actions.oppfolgingsdialogOpprettet(1)).to.deep.equal({
      type: actions.OPPFOLGINGSDIALOG_OPPRETTET,
      data: 1,
    });
  });

  it('Skal ha en hentOppfolgingsdialogerFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.opprettOppfolgingsdialogFeilet()).to.deep.equal({
      type: actions.OPPRETT_OPPFOLGINGSDIALOG_FEILET,
    });
  });

  it('Skal ha en godkjennDialog()-funksjon som returnerer riktig action', () => {
    expect(
      actions.godkjennDialog(
        'id',
        {
          fom: new Date(),
          tom: new Date(),
          evalueres: new Date(),
        },
        'true',
        true
      )
    ).to.deep.equal({
      type: actions.GODKJENN_DIALOG_FORESPURT,
      id: 'id',
      status: 'true',
      gyldighetstidspunkt: {
        fom: new Date(),
        tom: new Date(),
        evalueres: new Date(),
      },
      delMedNav: true,
    });
  });

  it('Skal ha en godkjennerDialog()-funksjon som returnerer riktig action', () => {
    expect(actions.godkjennerDialog()).to.deep.equal({
      type: actions.GODKJENNER_DIALOG,
    });
  });

  it('har en dialogGodkjent()-funksjon som returnerer riktig action', () => {
    const id = 'id';
    const status = 'true';
    const gyldighetstidspunkt = {
      fom: new Date(),
      tom: new Date(),
      evalueres: new Date(),
    };
    const delMedNav = true;

    expect(
      actions.dialogGodkjent(id, status, gyldighetstidspunkt, delMedNav)
    ).to.deep.equal({
      id,
      status,
      gyldighetstidspunkt,
      type: actions.DIALOG_GODKJENT,
      delMedNav: true,
    });
  });

  it('Skal ha en godkjennDialogFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.godkjennDialogFeilet()).to.deep.equal({
      type: actions.GODKJENN_DIALOG_FEILET,
    });
  });
});
