const { ApiPromise, Keyring } = require('@polkadot/api');
const { HttpProvider } = require('@polkadot/rpc-provider');
require("dotenv").config();

const main = async () => {
  const httpProvider = new HttpProvider(process.env.DATAHUB_URL);
  const api = await ApiPromise.create({ provider: httpProvider });
  const keyring = new Keyring({type: 'sr25519'});

  // Initialize account from the mnemonic
  const account = keyring.addFromUri(process.env.MNEMONIC);

  // Send tokens to proxy account
  const recipientAddr = process.env.PROXY_ADDRESS;
  const txHash = await api.tx.balances
    .transfer(recipientAddr, 100000000000)
    .signAndSend(account);

  console.log(`Funded proxy account: https://westend.subscan.io/extrinsic/${txHash}`);
};

main().catch((err) => {
  console.error(err);
}).finally(() => process.exit());
