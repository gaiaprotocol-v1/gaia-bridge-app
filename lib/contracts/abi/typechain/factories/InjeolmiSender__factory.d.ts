import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { InjeolmiSender } from "../InjeolmiSender";
export declare class InjeolmiSender__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_injeolmi: string, _signer: string, overrides?: Overrides): Promise<InjeolmiSender>;
    getDeployTransaction(_injeolmi: string, _signer: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): InjeolmiSender;
    connect(signer: Signer): InjeolmiSender__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): InjeolmiSender;
}
//# sourceMappingURL=InjeolmiSender__factory.d.ts.map