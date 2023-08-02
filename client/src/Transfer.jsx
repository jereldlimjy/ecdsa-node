import { useMemo, useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const isDisabled = useMemo(() => {
    if (!sendAmount || !recipient || !address) {
      return true;
    }

    return false;
  }, [sendAmount, recipient, address])

  const transaction = useMemo(() => {
    return {
      sendAmount: parseInt(sendAmount),
      recipient
    }
  }, [address, sendAmount, recipient])

  const handleSignAndTransfer = async () => {
    try {
      const hashedTxBlock = keccak256(utf8ToBytes(JSON.stringify(transaction)));
      const signature = secp256k1.sign(hashedTxBlock, privateKey);

      const {
        data: { balance },
      } = await server.post(`send`, {
        transaction,
        signature: {
          ...signature,
          r: signature.r.toString(),
          s: signature.s.toString(),
        },
      });
      setBalance(balance);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="container transfer">
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="button" className="button" value="Sign & Transfer" onClick={handleSignAndTransfer} disabled={isDisabled} />
    </form>
  );
}

export default Transfer;
