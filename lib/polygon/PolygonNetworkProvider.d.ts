import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
declare class PolygonNetworkProvider extends EventContainer {
    provider: ethers.providers.WebSocketProvider;
    signer: ethers.providers.JsonRpcSigner;
    constructor();
    getBlockNumber(): Promise<any>;
    getBalance(address: string): Promise<any>;
}
declare const _default: PolygonNetworkProvider;
export default _default;
//# sourceMappingURL=PolygonNetworkProvider.d.ts.map