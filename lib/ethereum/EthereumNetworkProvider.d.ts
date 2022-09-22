import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
declare class EthereumNetworkProvider extends EventContainer {
    provider: ethers.providers.WebSocketProvider;
    signer: ethers.providers.JsonRpcSigner;
    constructor();
    getBlockNumber(): Promise<any>;
    getBalance(address: string): Promise<any>;
}
declare const _default: EthereumNetworkProvider;
export default _default;
//# sourceMappingURL=EthereumNetworkProvider.d.ts.map