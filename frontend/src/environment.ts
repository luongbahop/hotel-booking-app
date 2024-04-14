const ENV = {
  dev: {
    API_URL: "http://localhost:3001",
  },
  prod: {
    API_URL: "http://localhost:3001",
  },
};

const getEnvVars = () => {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    return ENV.dev;
  } else if (env === "production") {
    return ENV.prod;
  } else {
    return ENV.dev;
  }
};

export default getEnvVars;
