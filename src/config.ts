export default {
  jwt: {
    authKey: process.env.JWT_KEY ?? 'zv68ai',
    expiresIn: '1d'
  },
  port: process.env.PORT ?? 3200,
  mongoUri: process.env.MONGO_URI ?? 'mongodb://mongo:27017/',
  env: process.env.ENV ?? 'dev'
};