import { HttpClient } from 'tsrpc-browser';
import { serviceProto } from '../shared/protocols/serviceProto';

let client = new HttpClient(serviceProto, {
    server: 'https://explorer-testnet-restful-api.web3games.org',
    json: true,
    // logger: console
});

export default client
