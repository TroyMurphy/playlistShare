interface EnvironmentConfig {
  PORT: number;
  CORS_ORIGIN: string;
}

interface Environments {
  [key: string]: EnvironmentConfig;
}

export const config: Environments = {
  development: {
    PORT: 5000,
    CORS_ORIGIN: "*",
  },
  production: {
    PORT: 80,
    CORS_ORIGIN: "https://karaoke.troymurphy.ca",
  },
};
