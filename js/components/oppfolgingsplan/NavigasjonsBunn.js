import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';
import {
    Knapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import { VenstreChevron } from 'nav-frontend-chevron';
import getContextRoot from '../../utils/getContextRoot';

const tekster = {
    knapp: {
        oversikt: 'Tilbake til oversikten',
        neste: 'Neste',
        tilbake: 'Tilbake',
    },
};

const handleKeyPress = (settAktivtSteg, nesteSteg, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        settAktivtSteg(nesteSteg);
    }
};

const StyledLink = styled(Link)`
    display: flex;
    font-weight: bold;
    align-items: center;
`;

const BackToOversikt = () => {
    return (
        <nav>
            <StyledLink to={`${getContextRoot()}/oppfolgingsplaner`}>
                <VenstreChevron />
                <span>{tekster.knapp.oversikt}</span>
            </StyledLink>
        </nav>
    );
};

const NavigasjonsBunn = (
    {
        steg,
        settAktivtSteg,
        disabled,
    }) => {
    if (disabled) {
        return <BackToOversikt />;
    }
    return (
        <nav className="navigasjonsBunn">
            { steg !== 3 &&
            <Hovedknapp
                className="navigasjonsBunn__frem"
                onKeyPress={(e) => { handleKeyPress(settAktivtSteg, steg + 1, e); }}
                onMouseDown={() => { settAktivtSteg(steg + 1); }}>
                {tekster.knapp.neste}
            </Hovedknapp>
            }
            { steg !== 1 &&
            <Knapp
                className="navigasjonsBunn__tilbake"
                onKeyPress={(e) => { handleKeyPress(settAktivtSteg, steg - 1, e); }}
                onMouseDown={() => { settAktivtSteg(steg - 1); }}>
                {tekster.knapp.tilbake}
            </Knapp>
            }
        </nav>);
};
NavigasjonsBunn.propTypes = {
    steg: PropTypes.number,
    settAktivtSteg: PropTypes.func,
    disabled: PropTypes.bool,
};

export default NavigasjonsBunn;
