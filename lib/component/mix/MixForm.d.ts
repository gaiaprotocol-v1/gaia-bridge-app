import { DomNode } from "skydapp-browser";
import MixSenderInterface from "../../contracts/MixSenderInterface";
import Swaper from "./MixSwaper";
export default class MixForm extends DomNode {
    private swaper;
    chainId: number;
    private isFrom;
    sender: MixSenderInterface | undefined;
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
//# sourceMappingURL=MixForm.d.ts.map