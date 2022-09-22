import { DomNode } from "skydapp-browser";
import InjeolmiSenderInterface from "../../contracts/InjeolmiSenderInterface";
import Swaper from "./IjmSwaper";
export default class IjmForm extends DomNode {
    private swaper;
    chainId: number;
    private isFrom;
    sender: InjeolmiSenderInterface | undefined;
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
//# sourceMappingURL=IjmForm.d.ts.map