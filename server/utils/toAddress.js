const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

// returns eth address from public key
const toAddress = (publicKey) => {
  const formattedPk = publicKey.slice(1);
  const hashedPk = keccak256(formattedPk);
  const address = `0x${toHex(hashedPk.slice(-20))}`;

  return address;
}

module.exports = toAddress;