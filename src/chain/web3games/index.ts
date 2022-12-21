import {CHAIN_URL,CHAIN_RPC_URL} from "../../constant";
import {ApiPromise, WsProvider} from "@polkadot/api";



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
export{
  chain_api,
}
