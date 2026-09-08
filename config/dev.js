require('dotenv').config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB } = process.env;
module.exports = {
  googleClientID:
    '70265989829-0t7m7ce5crs6scqd3t0t6g7pv83ncaii.apps.googleusercontent.com',
  googleClientSecret: '8mkniDQOqacXtlRD3gA4n2az',
  mongoURI: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`,
  cookieKey: '123123123',
};
