import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import KIP7Contract from "./klaytn-standard/KIP7Contract";
import PaxSenderInterface from "./PaxSenderInterface";
declare class KlaytnPaxContract extends KIP7Contract implements PaxSenderInterface {
    constructor();
    private watch;
    private getSendOverHorizonEvents;
    private getReceiveOverHorizonEvents;
    loadAddress(): Promise<string | undefined>;
    connect(): Promise<void>;
    addTokenToWallet(): void;
    sendOverHorizon(toChain: BigNumberish, receiver: string, amount: BigNumberish): Promise<void>;
    sended(sender: string, toChain: BigNumberish, receiver: string, index: BigNumberish): Promise<BigNumber>;
    sendCount(sender: string, toChain: BigNumberish, receiver: string): Promise<BigNumber>;
    receiveOverHorizon(fromChain: BigNumberish, sender: string, sendId: BigNumberish, amount: BigNumberish, signature: string): Promise<void>;
    received(receiver: string, fromChain: BigNumberish, sender: string, sendId: BigNumberish): Promise<boolean>;
}
declare const _default: KlaytnPaxContract;
export default _default;
//# sourceMappingURL=KlaytnPaxContract.d.ts.map