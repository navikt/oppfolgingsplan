const erHerokuApp = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    return url.indexOf('herokuapp') > -1;
};

export const getSykefravaerUrl = () => {
    return erHerokuApp()
        ? 'https://sykefravaer.herokuapp.com'
        : '/sykefravaer';
};