import { capitalize, camelCase, flow } from 'lodash';

export const pascalCase = flow(camelCase, capitalize);
