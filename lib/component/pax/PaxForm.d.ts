import { DomNode } from "skydapp-browser";
import PaxSenderInterface from "../../contracts/PaxSenderInterface";
import Swaper from "./PaxSwaper";
export default class PaxForm extends DomNode {
    private swaper;
    chainId: number;
    private isFrom;
    sender: PaxSenderInterface | undefined;
    private chainIcon;
    private chainSelect;
    private balanceDisplay;
    private inputContainer;
    private buttonContainer;
    constructor(swaper: Swaper, chainId: number, isFrom?: boolean);
    changeChain(chainId: number): Promise<void>;
    private loadBalance;
    private connectHandler;
    private transferHandler;
    private sendOverHorizonHandler;
    private getFormatting;
    delete(): void;
}
//# sourceMappingURL=PaxForm.d.ts.map