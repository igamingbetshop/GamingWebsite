import { environment as baseEnvironment } from '../../../../environments/environment.stg';

export const environment = {
  ...baseEnvironment,
  production: true,
  sessionStorageSalt: 'session-storage',
  localStorageSalt: 'local-storage',
  storageKey: '',
  baseUrl: '',
  projectPath: 'CraftBet'
};
