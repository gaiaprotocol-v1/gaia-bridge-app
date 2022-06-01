import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import PolygonWallet from "../polygon/PolygonWallet";
import WrappedInjeolmiArtifact from "./abi/artifacts/contracts/WrappedInjeolmi.sol/WrappedInjeolmi.json";
import { WrappedInjeolmi } from "./abi/typechain";
import InjeolmiSenderInterface from "./InjeolmiSenderInterface";
import ERC20Contract from "./polygon-standard/ERC20Contract";

class PolygonInjeolmiContract extends ERC20Contract<WrappedInjeolmi> implements InjeolmiSenderInterface {

    constructor() {
        super("0x9b23804ede399ebf86612b560Ac0451f1448185a", WrappedInjeolmiArtifact.abi, [
            "SetSigner",
            "SendOverHorizon",
            "ReceiveOverHorizon",
        ]);
        PolygonWallet.toss("connect", this);
    }

    public async loadAddress(): Promise<string | undefined> {
        return await PolygonWallet.loadAddress();
    }

    public async connect() {
        await PolygonWallet.connect();
    }

    public addTokenToWallet() {
        PolygonWallet.addToken(this.address, "IJM", 18, "https://tteok.org/images/injeolmi.png");
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

export default new PolygonInjeolmiContract();
