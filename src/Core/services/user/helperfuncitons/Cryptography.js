const crypto = require("crypto");


const algorithm = "aes-256-cbc";
const key=process.env.ENCRYPTION_KEY
// const key=crypto.randomBytes(32)
const iv = process.env.IV
// const iv=crypto.randomBytes(16)




function encryptPayload(payloadString) {
  console.log("inside encrypted payload fucntion");
  console.log(key,'env key');
  console.log(iv,'iv');
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  console.log("cipher line not executing");
  let encryptedPayload = cipher.update(payloadString, "utf8", "hex");
  console.log('the encrypted hex',encryptPayload);
  encryptedPayload += cipher.final("hex");
  // console.log('the encrypted hex after final',encryptPayload);
  return encryptedPayload;
}

function decryptPayload(encryptedPayload) {
  console.log("inside the decrypt payload");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  console.log("after the cipher");
  let decryptedPayload = decipher.update(encryptedPayload, "hex", "utf8");
  decryptedPayload += decipher.final("utf8");
  return decryptedPayload;
}


module.exports = { encryptPayload, decryptPayload };
