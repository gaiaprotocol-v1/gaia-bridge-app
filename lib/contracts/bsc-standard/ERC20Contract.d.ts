import { BigNumber, BigNumberish, ContractInterface, ethers } from "ethers";
import BSCContract from "../BSCContract";
export default abstract class ERC20Contract<CT extends ethers.Contract> extends BSCContract<CT> {
    constructor(address: string, abi: ContractInterface, eventNames: string[]);
    getName(): Promise<string>;
    getNonce(owner: string): Promise<BigNumber>;
    getTotalSupply(): Promise<BigNumber>;
    balanceOf(owner: string): Promise<BigNumber>;
    allowance(owner: string, spender: string): Promise<BigNumber>;
    transfer(to: string, amount: BigNumberish): Promise<void>;
    transferFrom(from: string, to: string, amount: BigNumberish): Promise<void>;
    approve(spender: string, amount: BigNumberish): Promise<void>;
}
//# sourceMappingURL=ERC20Contract.d.ts.map