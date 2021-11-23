export const hentLoginUrl = () => {
  if (window.location.href.indexOf('www.nav') > -1) {
    // Prod
    return 'https://loginservice.nav.no/login';
  } else if (window.location.href.indexOf('localhost') > -1) {
    // Lokalt
    return 'http://localhost:8080/syfoapi/local/cookie';
  }
  // Preprod
  return 'https://loginservice.dev.nav.no/login';
};

export const API_NAVN = {
  SYFOMOTEADMIN: 'syfomoteadmin',
  SYFOMOTEBEHOV: 'syfomotebehov',
  ISDIALOGMOTE: 'isdialogmote',
  SYFOOPPFOLGINGSPLANSERVICE: 'syfooppfolgingsplanservice',
};

export const hentSyfoapiUrl = (appNavn) => {
  const url = window && window.location && window.location.href ? window.location.href : '';
  if (url.indexOf('www.nav') > -1) {
    // Prod
    return `https://syfoapi.nav.no/${appNavn}/api`;
  } else if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
    // Lokalt
    return `/${appNavn}/api`;
  }
  // Preprod
  return `https://syfoapi.dev.nav.no/${appNavn}/api`;
};

export const defaultRequestHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
  };
};
