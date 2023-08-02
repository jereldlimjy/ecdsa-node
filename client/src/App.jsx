import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useEffect, useMemo, useState } from "react";
import server from "./server";
import toAddress from "./utils/toAddress";
import * as secp from "ethereum-cryptography/secp256k1";
import { hexToBytes } from "ethereum-cryptography/utils"


function App() {
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  
  const address = useMemo(() => {
    try {
      const publicKey = secp.secp256k1.getPublicKey(hexToBytes(privateKey));
      return toAddress(publicKey);
    } catch (err) {
      return "";
    }
  }, [privateKey]);

  useEffect(() => {
    async function fetchBalance() {
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }

    fetchBalance();
  }, [address])

  return (
    <div className="app">
      <Wallet
        address={address}
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} />
    </div>
  );
}

export default App;
