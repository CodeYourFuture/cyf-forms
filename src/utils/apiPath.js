export const appPath = "/volunteer";
export const domain = () => {
  switch (process.env.REACT_APP_NODE_ENV) {
    case "LOCAL":
      return "http://localhost:3001";
    case "STAGING":
      return "https://cyf-api.staging.codeyourfuture.io";
    case "PRODUCTION":
      return "https://cyf-api.codeyourfuture.io";
    default:
      return "No env";
  }
};