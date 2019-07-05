export const env = process.env.REACT_APP_NODE_ENV
export const apiEndpoints = {
  applicationForm:
     env === "TESTING" 
      ? "http://localhost:3001/google"
      : "https://script.google.com/macros/s/AKfycbyztQc4ZQuC_DVcMETR0pC5hU5FkvswbTYeyFmsmhiMNJtfgtp3/exec"
};
