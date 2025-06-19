const fs = require('fs');

const ensureUploadsDir = (uploadPath) => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log(`Uploads directory ensured at: ${uploadPath}`);
  }
};

module.exports = ensureUploadsDir;
