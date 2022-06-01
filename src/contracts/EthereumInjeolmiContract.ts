import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import EthereumWallet from "../ethereum/EthereumWallet";
import WrappedInjeolmiArtifact from "./abi/artifacts/contracts/WrappedInjeolmi.sol/WrappedInjeolmi.json";
import { WrappedInjeolmi } from "./abi/typechain";
import ERC20Contract from "./ethereum-standard/ERC20Contract";
import InjeolmiSenderInterface from "./InjeolmiSenderInterface";

class EthereumInjeolmiContract extends ERC20Contract<WrappedInjeolmi> implements InjeolmiSenderInterface {

    constructor() {
        super("0xBeA76c71929788Ab20e17759eaC115798F9aEf27", WrappedInjeolmiArtifact.abi, [
            "SetSigner",
            "SendOverHorizon",
            "ReceiveOverHorizon",
        ]);
        EthereumWallet.toss("connect", this);
    }

    public async loadAddress(): Promise<string | undefined> {
        return await EthereumWallet.loadAddress();
    }

    public async connect() {
        await EthereumWallet.connect();
    }

    public addTokenToWallet() {
        EthereumWallet.addToken(this.address, "IJM", 18, "https://tteok.org/images/injeolmi.png");
    }

    public async sendOverHorizon(toChain: BigNumberish, receiver: string, amount: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.sendOverHorizon(toChain, receiver, amount);
    }

    public async sended(sender: string, toChain: BigNumberish, receiver: string, index: BigNumberish): Promise<BigNumber> {
        return await this.contract.sended(sender, toChain, receiver, index);
    }

    public async sendCount(sender: string, toChain: BigNumberish, receiver: string): Promise<BigNumber> {
        return await this.contract.sendCount(sender, toChain, receiver);
    }

    public async receiveOverHorizon(fromChain: BigNumberish, sender: string, sendId: BigNumberish, amount: BigNumberish, signature: string) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.receiveOverHorizon(fromChain, sender, sendId, amount, signature);
    }

    public async received(receiver: string, fromChain: BigNumberish, sender: string, sendId: BigNumberish): Promise<boolean> {
        return await this.contract.received(receiver, fromChain, sender, sendId);
    }

    public async getTransferEvents(to: string, startBlock: number, endBlock: number) {
        const filter = this.contract.filters.Transfer(null, to, null);
        return await this.contract.queryFilter(filter, startBlock, endBlock);
    }
}

export default new EthereumInjeolmiContract();
