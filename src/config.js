export const env = import.meta.env.VITE_NODE_ENV
export const appPath = '/volunteer'

export const domain = () => {
  switch (env) {
    case 'LOCAL':
      return 'http://localhost:3001'
    case 'QA':
      return 'https://cyf-api.qa.codeyourfuture.io'
    case 'STAGING':
      return 'https://cyf-api.staging.codeyourfuture.io'
    case 'PRODUCTION':
      return 'https://cyf-api.codeyourfuture.io'
    default:
      return 'No env'
  }
}

const googleAnalyticsConfig = {
  LOCAL: 'LOCAL',
  STAGING: 'UA-86160746-5',
  PRODUCTION: 'UA-86160746-4'
}

export const GA_CONFIG = googleAnalyticsConfig[env]
