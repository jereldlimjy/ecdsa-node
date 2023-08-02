import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export default function toAddress(publicKey) {
  const formattedPk = publicKey.slice(1);
  const hashedPk = keccak256(formattedPk);
  const address = `0x${toHex(hashedPk.slice(-20))}`;

  return address;
}