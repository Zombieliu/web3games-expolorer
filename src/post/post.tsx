import { HttpClient } from 'tsrpc-browser';
import { serviceProto } from '../shared/protocols/serviceProto';

let client = new HttpClient(serviceProto, {
    // server: 'http://127.0.0.1:3002',
    server: 'https://explorer-testnet-restful-api.web3games.org',
    json: true,
    // logger: console
});

export default client
