import {
    getLedetekst,
    getHtmlLedetekst,
} from 'digisyfo-npm';
import { STATUS } from '../konstanter';
import { finnSistEndretAvNavn } from './oppfolgingsdialogUtils';
import { toDateMedMaanedNavn } from './datoUtils';

export const hentPlanStatus = (oppfolgingsdialog) => {
    const status = {
        tekst: '',
        img: '',
    };
    switch (oppfolgingsdialog.status) {
        case STATUS.UTDATERT:
            status.tekst = oppfolgingsdialog
                && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt
                // eslint-disable-next-line max-len
                && `${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)}`;
            status.img = 'plan-godkjent.svg';
            break;
        case STATUS.AVBRUTT:
            status.tekst = getLedetekst('oppfolgingsdialoger.plan.status.avbrutt');
            status.img = 'plan-avbrutt.svg';
            break;
        case STATUS.UNDER_ARBEID:
            status.tekst = getHtmlLedetekst('oppfolgingsdialog.oppfolgingsdialogTeaser.underArbeid', {
                '%DATO%': toDateMedMaanedNavn(oppfolgingsdialog.sistEndretDato),
                '%BRUKERNAVN%': finnSistEndretAvNavn(oppfolgingsdialog),
            });
            status.img = 'oppfolgingsdialog-tom.svg';
            break;
        case STATUS.AKTIV:
            status.tekst = oppfolgingsdialog
                && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt
                // eslint-disable-next-line max-len
                && `${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)}`;
            status.img = 'plan-godkjent.svg';
            break;
        default:
            status.tekst = oppfolgingsdialog
                && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt
                // eslint-disable-next-line max-len
                && `${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)}`;
            status.img = 'plan-godkjent.svg';
            break;
    }
    return status;
};

export const hentStatusUtenAktivSykmelding = (oppfolgingsdialog) => {
    return {
        tekst: oppfolgingsdialog && oppfolgingsdialog.godkjentPlan && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt ?
            `${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)}` : '',
        img: 'plan-ikke-aktiv-sykmelding--hake.svg',
    };
};