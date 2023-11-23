const NODE_ENV_DEV = 'dev' as const;
const NODE_ENV_PRODUCTION = 'production' as const;
export type NODE_ENV = typeof NODE_ENV_DEV | typeof NODE_ENV_PRODUCTION;
export interface custom_environment_variables {
  NODE_ENV: NODE_ENV;
  SERVER: SERVER;
  CAPTCHA_CONFIG: CAPTCHA_CONFIG;
  REDIS: REDIS;
}
export interface SERVER {
  PORT: string;
  URL: string;
}

export interface CAPTCHA_CONFIG {
  MIN_SIZE: string;
  MAX_SIZE: string;
}

export interface REDIS {
  HOST: string;
  PORT: string;
  TTL: string;
}
