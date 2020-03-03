const crypto = require("crypto");
class Encryption {
  /**
   *
   * @param {*} algorithm crypto.getCiphers()
   * @param {*} password password
   */
  constructor(algorithm, password) {
    this.algorithm = algorithm;
    this.password = password;

    let key = Buffer.alloc(32); // key should be 32 bytes
    let iv = Buffer.alloc(16); // iv should be 16

    const password_buffer = Buffer.from(password);

    key = Buffer.concat([password_buffer], key.length);
    iv = Buffer.concat([password_buffer], iv.length);

    this.cipher = crypto.createCipheriv(algorithm, key, iv);
    this.decipher = crypto.createDecipheriv(algorithm, key, iv);
  }
  encrypt(data) {
    return new Promise((resolve, reject) => {
      try {
        const encrypted = Buffer.concat([
          this.cipher.update(data, "utf8"),
          this.cipher.final()
        ]);
        resolve(encrypted);
      } catch (exception) {
        reject(exception);
      }
    });
  }

  decrypt(data) {
    return new Promise((resolve, reject) => {
      try {
        const decrypted = Buffer.concat([
          this.decipher.update(data),
          this.decipher.final()
        ]);
        resolve(decrypted);
      } catch (exception) {
        reject(exception);
      }
    });
  }
}

module.exports = Encryption;
