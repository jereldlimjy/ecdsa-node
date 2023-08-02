import server from "./server";

function Wallet({ privateKey, setPrivateKey, balance, address }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="address">Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
