import * as actiontyper from '../actions/actiontyper';

const defaultState = {
    data: [],
};

const setLederProps = (_ledere, orgnummer, props) => {
    return _ledere.map((leder) => {
        if (leder.orgnummer === orgnummer) {
            return {
                ...leder,
                ...props,
            };
        }
        return leder;
    });
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontyper.LEDERE_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case actiontyper.HENTER_LEDERE: {
            return {
                henter: true,
                hentingFeilet: false,
                data: [],
                hentet: false,
            };
        }
        case actiontyper.HENT_LEDERE_FEILET: {
            return {
                henter: false,
                hentingFeilet: true,
                data: [],
                hentet: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default ledere;
