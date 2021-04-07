import PropTypes from 'prop-types';
import { naermesteLeder } from '@navikt/digisyfo-npm';

export {
  arbeidssituasjon,
  naermesteLeder,
  arbeidsgiver,
  sykmeldingdiagnose,
  sykmeldingperiode,
  sykmeldingstatus,
  sykmelding,
  tidslinjehendelse,
} from '@navikt/digisyfo-npm';

export const brodsmule = PropTypes.shape({
  sti: PropTypes.string,
  tittel: PropTypes.string,
  sisteSmule: PropTypes.bool,
  erKlikkbar: PropTypes.bool,
});

const meta = PropTypes.shape({
  error: PropTypes.string,
  touched: PropTypes.bool,
});

const input = PropTypes.shape({
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
});

export const fieldPropTypes = { meta, input };

export const childEllerChildren = PropTypes.node;

export const opprettOppfolgingArbeidsgiverPt = PropTypes.shape({
  virksomhetsnummer: PropTypes.string,
  navn: PropTypes.string,
  harNaermesteLeder: PropTypes.bool,
  naermesteLeder: PropTypes.string,
});

export const dinesykmeldingerReducerPt = PropTypes.shape({
  data: PropTypes.arrayOf(naermesteLeder),
  henter: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
  hentet: PropTypes.bool,
  sender: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
  avbryter: PropTypes.bool,
  avbrytFeilet: PropTypes.bool,
});

export const ledereReducerPt = PropTypes.shape({
  data: PropTypes.arrayOf(naermesteLeder),
  henter: PropTypes.bool,
  hentet: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
});
