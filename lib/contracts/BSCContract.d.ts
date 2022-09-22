import { ContractInterface, ethers } from "ethers";
import { EventContainer } from "skydapp-common";
export default abstract class BSCContract<CT extends ethers.Contract> extends EventContainer {
    address: string;
    private abi;
    protected walletContract: CT | undefined;
    protected contract: CT;
    constructor(address: string, abi: ContractInterface, eventNames: string[]);
    get interface(): any;
    getWalletContract(): Promise<CT | undefined>;
    connectAndGetWalletContract(): Promise<CT | undefined>;
}
//# sourceMappingURL=BSCContract.d.ts.map