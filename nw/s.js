// Node.js example to generate a strong 256-bit (32-byte) secret
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret); // Keep this secure!