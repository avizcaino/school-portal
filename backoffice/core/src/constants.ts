import {constantBuilder} from '@uxland/utilities';
export const BACKOFFICE = 'BACKOFFICE';

export const backofficeConstantBuilder = (suffix: string, separator?: string) =>
  constantBuilder(BACKOFFICE, suffix, separator);
export const coreActionBuilder = backofficeConstantBuilder('ACTION');
export const coreEventBuilder = backofficeConstantBuilder('EVENT', '::');
