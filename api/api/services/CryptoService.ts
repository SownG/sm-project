var cryptojs = require('crypto-js');

module.exports = {
  encrypt: function (string) {
    return cryptojs[process.env.CRYPTO_ALG].encrypt(string, process.env.CRYPTO_KEY).toString();
  },

  decrypt: function (hex) {
    var bytes = cryptojs[process.env.CRYPTO_ALG].decrypt(hex, process.env.CRYPTO_KEY);
    return bytes.toString(cryptojs.enc.Utf8);
  }
}
