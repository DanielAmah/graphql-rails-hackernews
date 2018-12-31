const allConfig = {
  development: {
    RAILS_API_BASE_URL: "http://localhost:3001/api",
    BASE_URL: "http://localhost:3000",
    REDIRECT_URL: "http://localhost:3000/validate-login"
  },
  test: {
    RAILS_API_BASE_URL: "http://localhost:3001/api",
    BASE_URL: "http://localhost:3000",
    REDIRECT_URL: "http://localhost:3000/validate-login"
  },
  production: {
    RAILS_API_BASE_URL: "https://hackernewz.herokuapp.com/api",
    BASE_URL: "https://hackernewz.herokuapp.com",
    REDIRECT_URL: "http://localhost:3000/validate-login"
  }
};

export default allConfig[process.env.NODE_ENV];
