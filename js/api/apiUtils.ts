import { isLabs, isLocal, isProd } from '@/utils/urlUtils';

export const hentLoginUrl = () => {
  if (isProd()) {
    return 'https://loginservice.nav.no/login';
  } else if (isLocal()) {
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
  if (isProd()) {
    return `https://syfoapi.nav.no/${appNavn}/api`;
  } else if (isLocal() || isLabs()) {
    return `/${appNavn}/api`;
  }
  return `https://syfoapi.dev.nav.no/${appNavn}/api`;
};

export const defaultRequestHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
  };
};
