import * as polkadotCryptoUtils from '@polkadot/util-crypto';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

const check_address = (address: string) => {
    const isValidAddressPolkadotAddress = () => {
        try {
            encodeAddress(
                isHex(address)
                    ? hexToU8a(address)
                    : decodeAddress(address),
            );

            return true;
        } catch (error) {
            return false;
        }
    };

    // check evm address
    const evmaddress = polkadotCryptoUtils.isEthereumAddress(address);

    const ss58isValid = isValidAddressPolkadotAddress();

    if (!ss58isValid && !evmaddress) {
        return 0;
    } else {
        if (evmaddress) {
            return 1;
        }else{
            return 2;
        }
    }
}

const showAccount = (str:string, maxlength = 9) => {
    const length = str.length;
    return str.length > maxlength
        ? str.slice(0, maxlength - 1) + '...' + str.slice(56, length)
        : str;
};
const showSmallAccount = (str, maxlength = 9) => {
    const length = str.length;
    return str.length > maxlength
        ? str.slice(0, maxlength - 1) + '...' + str.slice(34, length)
        : str;
};
export  {check_address,showAccount,showSmallAccount}
