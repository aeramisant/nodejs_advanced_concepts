module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  redisUrl: 'redis://127.0.0.1:6379',
  gcsBucket: process.env.GCS_BUCKET,
  googleCloudProjectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  googleCloudKeyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
};
