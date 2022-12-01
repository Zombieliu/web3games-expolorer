import {cropData} from "../../utils/math";
import axios from "axios";
import {CHAIN_URL,CHAIN_RPC_URL} from "../../constant";
const { ApiPromise, WsProvider} = require('@polkadot/api');



const chain_api = async ()=>{
  const provider = new WsProvider(CHAIN_URL);
  // const provider = new WsProvider('ws://47.243.17.26:9944');
  const api = await ApiPromise.create({
    provider,
    rpc: {
      "exchange": {
        "getAmountOutPrice": {
          "description": "get amount out price",
          "params": [
            {
              "name": "supply",
              "type": "u128"
            },
            {
              "name": "path",
              "type": "Vec<u128>"
            },
            {
              "name": "at",
              "type": "Hash",
              "isOptional": true
            }
          ],
          "type": "Vec<u128>",
        },
        "getAmountInPrice": {
          "description": "get amount in price",
          "params": [
            {
              "name": "supply",
              "type": "u128"
            },
            {
              "name": "path",
              "type": "Vec<u128>"
            },
            {
              "name": "at",
              "type": "Hash",
              "isOptional": true
            }
          ],
          "type": "Vec<u128>",
        },
        "getEstimateLpToken": {
          "description": "get estimate lp token",
          "params": [
            {
              "name": "token_0",
              "type": "u128"
            },
            {
              "name": "amount_0",
              "type": "u128"
            },
            {
              "name": "token_1",
              "type": "u128"
            },
            {
              "name": "amount_1",
              "type": "u128"
            },
            {
              "name": "at",
              "type": "Hash",
              "isOptional": true
            }
          ],
          "type": "u128",
        },
        "getEstimateOutToken": {
          "description": "get estimate out token",
          "params": [
            {
              "name": "supply",
              "type": "u128"
            },
            {
              "name": "token_0",
              "type": "u128"
            },
            {
              "name": "token_1",
              "type": "u128"
            },
            {
              "name": "at",
              "type": "Hash",
              "isOptional": true
            }
          ],
          "type": "u128",
        },
      },
    }
  });
  return api
}

const substrate_wallet_injector = async (intactWalletAddress:string)=>{
  const web3FromAddress = (await import("@polkadot/extension-dapp")).web3FromAddress;
  const injector = await web3FromAddress(intactWalletAddress);
  return injector
}




// const swap = async (intactWalletAddress)=>{
//   const web3Enable = (await import("@polkadot/extension-dapp")).web3Enable;
//   await web3Enable('my cool dapp');
//   const web3FromAddress = (await import("@polkadot/extension-dapp")).web3FromAddress;
//   const injector = await web3FromAddress(intactWalletAddress);
//   const api = await chain_api(intactWalletAddress)
//   const transferExtrinsic = api.tx.exchange.swapExactTokensForTokens(,10000,[1,2],"5CcgM2vkikJv6utQaS6jWDhV6DgnoyacKE81qzXZ52FSxkY8")
//   transferExtrinsic.signAndSend(intactWalletAddress, { signer: injector.signer }, ({ status }) => {
//     if (status.isInBlock) {
//       console.log(`Completed at block hash #${status.asInBlock.toString()}`);
//     } else {
//       console.log(`Current status: ${status.type}`);
//     }
//   }).catch((error: any) => {
//     console.log(':( transaction failed', error);
//   });
// }




export{
  chain_api,
  substrate_wallet_injector,
  // swap,

}
