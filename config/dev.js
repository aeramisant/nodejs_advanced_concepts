require('dotenv').config();

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB,
  GCS_BUCKET,
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_APPLICATION_CREDENTIALS,
} = process.env;

module.exports = {
  googleClientID:
    '70265989829-0t7m7ce5crs6scqd3t0t6g7pv83ncaii.apps.googleusercontent.com',
  googleClientSecret: '8mkniDQOqacXtlRD3gA4n2az',
  mongoURI: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`,
  cookieKey: '123123123',
  redisUrl: 'redis://127.0.0.1:6379',
  gcsBucket: GCS_BUCKET,
  googleCloudProjectId: GOOGLE_CLOUD_PROJECT_ID,
  googleCloudKeyFile: GOOGLE_APPLICATION_CREDENTIALS,
};
