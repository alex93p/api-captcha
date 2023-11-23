import packageJson from '../../package.json';
import env from './functions/parsedEnv';

export default {
  ...env,
  ...{
    SERVICE_NAME: packageJson.name,
    VERSION: packageJson.version,
  },
};
