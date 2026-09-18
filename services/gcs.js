const { Storage } = require('@google-cloud/storage');
const keys = require('../config/keys');

const storageOptions = {};

if (keys.googleCloudKeyFile) {
  storageOptions.keyFilename = keys.googleCloudKeyFile;
}

if (keys.googleCloudProjectId) {
  storageOptions.projectId = keys.googleCloudProjectId;
}

const storage = new Storage(storageOptions);

module.exports = {
  getPublicUrl(key) {
    return `https://storage.googleapis.com/${keys.gcsBucket}/${key}`;
  },

  getUploadUrl(key, contentType) {
    return storage
      .bucket(keys.gcsBucket)
      .file(key)
      .getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000,
        contentType,
      })
      .then(([url]) => url);
  },

  uploadFile(key, buffer, contentType) {
    return storage.bucket(keys.gcsBucket).file(key).save(buffer, {
      metadata: { contentType },
      resumable: false,
    });
  },
};
