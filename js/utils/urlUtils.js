export const erHerokuApp = () => {
  const url = window && window.location && window.location.href ? window.location.href : '';

  return url.indexOf('herokuapp') > -1;
};

export const getSykefravaerUrl = () => {
  return erHerokuApp() ? 'https://sykefravaer.herokuapp.com' : process.env.REACT_APP_SYKEFRAVAER_ROOT;
};

export const isLocal = () => {
  return window.location.host.indexOf('localhost') > -1;
};

export const isPreProd = () => {
  return window.location.href.indexOf('www-gcp.dev') > -1;
};
