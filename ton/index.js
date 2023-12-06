import { TonClient, WalletContractV4, internal } from "ton";
import { mnemonicNew, mnemonicToPrivateKey } from "ton-crypto";
import "dotenv/config";

// Create Client
const client = new TonClient({
  endpoint: "https://toncenter.com/api/v2/jsonRPC",
});

// Generate new key
// let mnemonics = await mnemonicNew();
let mnemonics =
  "limit sick session letter online mean off laugh embrace trust gift pluck office fly thunder avocado luggage general toddler demise tomato prevent private fence";
mnemonics = mnemonics.split(" ");

let keyPair = await mnemonicToPrivateKey(mnemonics);

// Create wallet contract
let workchain = 0; // Usually you need a workchain 0
let wallet = WalletContractV4.create({
  workchain,
  publicKey: keyPair.publicKey,
});
let contract = client.open(wallet);

(async () => {
  // Get balance
  let balance = await contract.getBalance();
  // Create a transfer
  console.log(wallet.address);
  let seqno = await contract.getSeqno();

  let transfer = await contract.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [
      internal({
        value: "0",
        to: "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N",
        body: "Hello world",
      }),
    ],
  });
})();
