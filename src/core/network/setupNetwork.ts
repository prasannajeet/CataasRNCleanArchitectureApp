import { CATAAS_BASE_URL } from '../config/api.config';
import {CataasNetwork} from './CataasNetwork';

/**
 * Create and configure the CataasNetwork instance
 */
export const setupCataasNetwork = (): CataasNetwork => {
  const network = CataasNetwork.getInstance(CATAAS_BASE_URL);
  return network;
};

export const cataasNetwork = setupCataasNetwork();
