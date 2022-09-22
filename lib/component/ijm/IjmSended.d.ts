import { DomNode } from "skydapp-browser";
import InjeolmiSenderInterface from "../../contracts/InjeolmiSenderInterface";
export default class IjmSended extends DomNode {
    private fromSender;
    private toSender;
    private fromChain;
    private toChain;
    private sender;
    private receiver;
    private sendId;
    private retry;
    constructor(fromSender: InjeolmiSenderInterface, toSender: InjeolmiSenderInterface, fromChain: number, toChain: number, sender: string, receiver: string, sendId: number, retry: () => void);
    private load;
    private getChainName;
    private getFormatting;
    private receiveOverHorizonHandler;
    delete(): void;
}
//# sourceMappingURL=IjmSended.d.ts.map