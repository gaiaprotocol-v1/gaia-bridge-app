import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
declare class BSCNetworkProvider extends EventContainer {
    provider: ethers.providers.JsonRpcProvider;
    signer: ethers.providers.JsonRpcSigner;
    constructor();
    getBlockNumber(): Promise<any>;
    getBalance(address: string): Promise<any>;
}
declare const _default: BSCNetworkProvider;
export default _default;
//# sourceMappingURL=BSCNetworkProvider.d.ts.map