const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');

const uploadDir = path.join(__dirname, '..', 'uploads');

function ensureUploadDir() {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

module.exports = {
  save(userId, file) {
    ensureUploadDir();

    const extension = file.mimetype.split('/')[1] || 'jpeg';
    const filename = `${userId}-${uuid()}.${extension}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, file.buffer);

    return `/uploads/${filename}`;
  },
};
