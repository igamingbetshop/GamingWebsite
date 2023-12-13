import { environment as baseEnvironment } from '../../../../environments/environment';

export const environment = {
  ...baseEnvironment,
  production: false,
  sessionStorageSalt: 'session-storage',
  localStorageSalt: 'local-storage',
  storageKey: '',
  baseUrl: ''
};
