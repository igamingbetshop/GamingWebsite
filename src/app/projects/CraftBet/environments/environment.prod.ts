import { environment as baseEnvironment } from '../../../../environments/environment.prod';

export const environment = {
  ...baseEnvironment,
  production: true,
  sessionStorageSalt: 'session-storage',
  localStorageSalt: 'local-storage',
  storageKey: '',
  baseUrl: '',
};
