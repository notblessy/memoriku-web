const base = {
    COOKIE_NAME: 'memoriku-web',
    LAST_VISIT: 'last-visit',
  };
  
  const development = (function () {
    let apiHost = 'http://localhost:8000';
  
    if (process.env.REACT_APP_API_HOST) {
      apiHost = process.env.REACT_APP_API_HOST;
    }
  
    return {
      ...base,
      API_HOST: apiHost,
    };
  })();
  
  const staging = {
    ...base,
    API_HOST: process.env.REACT_APP_API_HOST,
  };
  
  const production = {
    ...base,
    API_HOST: process.env.REACT_APP_API_HOST,
  };
  
  const env = process.env.REACT_APP_STAGE || 'development';
  export default env === 'production'
    ? production
    : env === 'staging'
    ? staging
    : development;
  