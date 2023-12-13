import {getDomain} from "../app/@core/utils";

export const environment = {
  production: true,
  projectPath: window['PartnerName'],
  hostName: getDomain()
};
