import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { WrappedInjeolmi } from "../WrappedInjeolmi";
export declare class WrappedInjeolmi__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_signer: string, overrides?: Overrides): Promise<WrappedInjeolmi>;
    getDeployTransaction(_signer: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): WrappedInjeolmi;
    connect(signer: Signer): WrappedInjeolmi__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WrappedInjeolmi;
}
//# sourceMappingURL=WrappedInjeolmi__factory.d.ts.map