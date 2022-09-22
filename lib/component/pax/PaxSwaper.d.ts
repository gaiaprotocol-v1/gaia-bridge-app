import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { DomNode } from "skydapp-browser";
export default class PaxSwaper extends DomNode {
    private fromForm;
    private toForm;
    private sendedList;
    constructor();
    private loadHistoryNonce;
    private loadHistory;
    addSended(sender: string, receiver: string, sendId: BigNumber): void;
    sendOverHorizon(amount: BigNumberish): Promise<void>;
    receiveOverHorizon(_receiver: string, toChain: BigNumberish, sender: string, sendId: BigNumber, amount: BigNumberish): Promise<void>;
}
//# sourceMappingURL=PaxSwaper.d.ts.map