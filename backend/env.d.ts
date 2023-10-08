export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URL: string;
            JWT_SECRET: string;
            JWT_EXPIRES: string;

            CLOUD_NAME: string;
            API_KEY: string;
            API_SECRET: string;
        }
    }
}