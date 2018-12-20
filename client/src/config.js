const allConfig = {
    development: {
      RAILS_API_BASE_URL: 'http://localhost:3001',
      BASE_URL: 'http://localhost:3000',
      REDIRECT_URL: 'http://localhost:3000/validate-login'
    },
  };

  export const config = allConfig[process.env.NODE_ENV];
