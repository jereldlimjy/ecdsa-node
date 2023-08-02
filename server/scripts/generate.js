const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const toAddress = require("../utils/toAddress");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const address = toAddress(publicKey);

console.log('public key:', address);
console.log('private key:', toHex(privateKey));