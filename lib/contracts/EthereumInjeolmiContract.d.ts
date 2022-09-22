import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { WrappedInjeolmi } from "./abi/typechain";
import ERC20Contract from "./ethereum-standard/ERC20Contract";
import InjeolmiSenderInterface from "./InjeolmiSenderInterface";
declare class EthereumInjeolmiContract extends ERC20Contract<WrappedInjeolmi> implements InjeolmiSenderInterface {
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
declare const _default: EthereumInjeolmiContract;
export default _default;
//# sourceMappingURL=EthereumInjeolmiContract.d.ts.map