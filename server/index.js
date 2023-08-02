const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const toAddress = require("./utils/toAddress");

app.use(cors());
app.use(express.json());

const balances = {
  // pk: 061e15eb71d3316157e015b9e2c35b5dc2d4e967f3703b505230d4a732fd2e08
  "0x0320dd553a5ab3b467d07da357254acf0b024607": 100,
  // pk: 46233329ca4d0b6e9fe130f8811829ae36e43705230c060aef097571323869f0
  "0xd6c37cff43be44f4fa0db38374c1f1bb1c28a6ae": 50,
  // pk: 8db408f4063b0ec15012b528afdf85f54059744a1169d1f902d3ac737c58bf00
  "0xca6a2c40fceeade377d17db84b1f9a4c807abdbe": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { transaction } = req.body;

  // const hashedTx = keccak256(utf8ToBytes(JSON.stringify(transaction)));
  const sender = "0x0320dd553a5ab3b467d07da357254acf0b024607";
  const recipient = transaction.recipient;
  const amount = transaction.sendAmount;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}