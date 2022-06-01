import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { constants } from "ethers";
import PolygonWallet from "../polygon/PolygonWallet";
import PaxSenderArtifact from "./abi/pax/artifacts/contracts/Pax/PaxSender.sol/PaxSender.json";
import PaxContract from "./PaxContract";
import PaxSenderInterface from "./PaxSenderInterface";
import PolygonContract from "./PolygonContract";

class PaxSenderContract extends PolygonContract<any> implements PaxSenderInterface {

    constructor() {
        super("0xcE1F2562cc390D65CCB7A505E81342a63fD838f9", PaxSenderArtifact.abi, [
            "SetSigner",
            "SendOverHorizon",
            "ReceiveOverHorizon",
        ]);
        PaxContract.toss("Transfer", this);
        PolygonWallet.toss("connect", this);
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return await PaxContract.balanceOf(owner);
    }

    public async loadAddress(): Promise<string | undefined> {
        return await PolygonWallet.loadAddress();
    }

    public async connect() {
        await PolygonWallet.connect();
    }

    public addTokenToWallet() {
        PolygonWallet.addToken(PaxContract.address, "PAX", 18, "https://raw.githubusercontent.com/clonesneverdie/pax/main/docs/pax.png");
    }

    public async sendOverHorizon(toChain: BigNumberish, receiver: string, amount: BigNumberish) {
        const owner = await PolygonWallet.loadAddress();
        if (owner !== undefined) {
            if ((await PaxContract.allowance(owner, this.address)).lt(amount)) {
                await PaxContract.approve(this.address, constants.MaxUint256);
            } else {
                const contract = await this.connectAndGetWalletContract();
                await contract?.sendOverHorizon(toChain, receiver, amount);
            }
        }
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

export default new PaxSenderContract();
