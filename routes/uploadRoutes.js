const multer = require('multer');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const gcs = require('../services/gcs');
const localUpload = require('../services/localUpload');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = (app) => {
  app.post(
    '/api/upload',
    requireLogin,
    upload.single('image'),
    async (req, res) => {
      if (!req.file) {
        return res.status(400).send({ error: 'No image provided' });
      }

      const extension = req.file.mimetype.split('/')[1] || 'jpeg';
      const key = `${req.user.id}/${uuid()}.${extension}`;

      try {
        await gcs.uploadFile(key, req.file.buffer, req.file.mimetype);
        return res.send({ imageUrl: gcs.getPublicUrl(key) });
      } catch (err) {
        console.error('GCS upload failed:', err.message);

        if (['production', 'ci'].includes(process.env.NODE_ENV)) {
          return res.status(500).send({ error: 'Unable to upload image' });
        }

        const imageUrl = localUpload.save(req.user.id, req.file);
        console.warn('Using local upload fallback:', imageUrl);

        return res.send({ imageUrl });
      }
    },
  );

  app.get('/api/upload/url', requireLogin, async (req, res) => {
    const contentType = req.query.contentType || 'image/jpeg';
    const extension = contentType.split('/')[1] || 'jpeg';
    const key = `${req.user.id}/${uuid()}.${extension}`;

    try {
      const url = await gcs.getUploadUrl(key, contentType);
      const imageUrl = gcs.getPublicUrl(key);

      res.send({ url, key, imageUrl });
    } catch (err) {
      res.status(500).send({ error: 'Unable to create upload URL' });
    }
  });
};
