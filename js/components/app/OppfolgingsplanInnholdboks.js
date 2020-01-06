import React from 'react';
import PropTypes from 'prop-types';

const OppfolgingsplanInfoboks = (
    {
        classnames = '',
        svgUrl,
        svgAlt,
        tittel,
        children,
        liteikon,
        mediumIcon,
    }) => {
    const icon = () => {
        if (liteikon) {
            return ({ width: '2em' });
        } else if (mediumIcon) {
            return ({ width: '4em' });
        }
        return {};
    };

    return (
        <div className={`panel ${classnames}`}>
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src={svgUrl} alt={svgAlt} style={icon()} />
                <h2 className="illustrertTittel__tittel">{tittel}</h2>
            </div>
            {children}
        </div>);
};

OppfolgingsplanInfoboks.propTypes = {
    classnames: PropTypes.string,
    svgUrl: PropTypes.string,
    liteikon: PropTypes.bool,
    mediumIcon: PropTypes.bool,
    svgAlt: PropTypes.string,
    tittel: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

export default OppfolgingsplanInfoboks;
