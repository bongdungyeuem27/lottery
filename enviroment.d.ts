export type PUBLIC_ENV =
  | (Record<string, string> & {
      NEXT_PUBLIC_APP_ENV: "prod" | "local";
      NEXT_PUBLIC_BE_API: string;
      NEXT_PUBLIC_ORDER_API: string;
      NEXT_PUBLIC_PAYMENT_API: string;
      NEXT_PUBLIC_MANAGER_API: string;
      NEXT_PUBLIC_GTAG_ID: string;
      NEXT_PUBLIC_OAUTH_CLIENT_ID: string;
      NEXT_PUBLIC_OAUTH_REDIRECT_URI: string;
    })
  | undefined;

export type PRIVATE_ENV = {
  NEXT_PUBLIC_APP_ENV: "prod" | "local";
  NODE_ENV: "development" | "production";
  NEXT_PUBLIC_BE_API: string;
  NEXT_PUBLIC_ORDER_API: string;
  NEXT_PUBLIC_PAYMENT_API: string;
  NEXT_PUBLIC_MANAGER_API: string;
  TURNSTILE_KEY: string;
  NEXT_SERVER_ACTIONS_ENCRYPTION_KEY: string;
  NEXT_PUBLIC_GTAG_ID: string;
  MONGO_ADMIN: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  NEXT_PUBLIC_OAUTH_CLIENT_ID: string;
  OAUTH_CLIENT_SECRET: string;
  NEXT_PUBLIC_OAUTH_REDIRECT_URI: string;
  JWT_SECRET: string;
};
