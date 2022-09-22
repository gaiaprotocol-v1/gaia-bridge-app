import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { WrappedInjeolmi } from "./abi/typechain";
import InjeolmiSenderInterface from "./InjeolmiSenderInterface";
import ERC20Contract from "./polygon-standard/ERC20Contract";
declare class PolygonInjeolmiContract extends ERC20Contract<WrappedInjeolmi> implements InjeolmiSenderInterface {
    constructor();
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
declare const _default: PolygonInjeolmiContract;
export default _default;
//# sourceMappingURL=PolygonInjeolmiContract.d.ts.map