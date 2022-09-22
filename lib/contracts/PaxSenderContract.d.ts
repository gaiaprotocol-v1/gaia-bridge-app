import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import PaxSenderInterface from "./PaxSenderInterface";
import PolygonContract from "./PolygonContract";
declare class PaxSenderContract extends PolygonContract<any> implements PaxSenderInterface {
    constructor();
    balanceOf(owner: string): Promise<BigNumber>;
    loadAddress(): Promise<string | undefined>;
    connect(): Promise<void>;
    addTokenToWallet(): void;
    sendOverHorizon(toChain: BigNumberish, receiver: string, amount: BigNumberish): Promise<void>;
    sended(sender: string, toChain: BigNumberish, receiver: string, index: BigNumberish): Promise<BigNumber>;
    sendCount(sender: string, toChain: BigNumberish, receiver: string): Promise<BigNumber>;
    receiveOverHorizon(fromChain: BigNumberish, sender: string, sendId: BigNumberish, amount: BigNumberish, signature: string): Promise<void>;
    received(receiver: string, fromChain: BigNumberish, sender: string, sendId: BigNumberish): Promise<boolean>;
    getTransferEvents(to: string, startBlock: number, endBlock: number): Promise<any>;
}
declare const _default: PaxSenderContract;
export default _default;
//# sourceMappingURL=PaxSenderContract.d.ts.map