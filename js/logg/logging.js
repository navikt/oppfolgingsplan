import { Logger } from '../logging';
import { getCookie } from '../utils/browserUtils';

export default new Logger({
  url: `${process.env.REACT_APP_SYFOOPREST_ROOT}/logging`,
  fetchConfig: (config) => {
    config.headers.set('NAV_CSRF_PROTECTION', getCookie('NAV_CSRF_PROTECTION'));
    return Object.assign({}, config, {
      credentials: 'include',
    });
  },
});
