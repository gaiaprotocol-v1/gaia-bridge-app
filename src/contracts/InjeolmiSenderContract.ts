import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { constants } from "ethers";
import Klaytn from "../klaytn/Klaytn";
import KlaytnWallet from "../klaytn/KlaytnWallet";
import InjeolmiSenderArtifact from "./abi/artifacts/contracts/InjeolmiSender.sol/InjeolmiSender.json";
import InjeolmiContract from "./InjeolmiContract";
import InjeolmiSenderInterface from "./InjeolmiSenderInterface";
import KlaytnContract from "./KlaytnContract";

class InjeolmiSenderContract extends KlaytnContract implements InjeolmiSenderInterface {

    constructor() {
        super("0x19f112c05Fad52e5C58E5A4628548aBB45bc8697", InjeolmiSenderArtifact.abi);
        KlaytnWallet.toss("connect", this);
        this.watch();
    }

    private async watch() {
        let prevBlock = await Klaytn.loadBlockNumber();
        setInterval(async () => {
            const currentBlock = await Klaytn.loadBlockNumber();
            const transferEvents = await InjeolmiContract.getTransferEvents(prevBlock, currentBlock);
            for (const event of transferEvents) {
                this.fireEvent("Transfer", event.returnValues[0], event.returnValues[1], BigNumber.from(event.returnValues[2]));
            }
            const sendOverHorizonEvents = await this.getSendOverHorizonEvents(prevBlock, currentBlock);
            for (const event of sendOverHorizonEvents) {
                this.fireEvent("SendOverHorizon", event.returnValues[0], BigNumber.from(event.returnValues[1]), event.returnValues[2], BigNumber.from(event.returnValues[3]), BigNumber.from(event.returnValues[4]));
            }
            const receiveOverHorizonEvents = await this.getReceiveOverHorizonEvents(prevBlock, currentBlock);
            for (const event of receiveOverHorizonEvents) {
                this.fireEvent("ReceiveOverHorizon", event.returnValues[0], BigNumber.from(event.returnValues[1]), event.returnValues[2], BigNumber.from(event.returnValues[3]), BigNumber.from(event.returnValues[4]));
            }
            prevBlock = currentBlock + 1;
        }, 2000);
    }

    private async getSendOverHorizonEvents(startBlock: number, endBlock: number) {
        const events = await this.contract.getPastEvents("SendOverHorizon", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }

    private async getReceiveOverHorizonEvents(startBlock: number, endBlock: number) {
        const events = await this.contract.getPastEvents("ReceiveOverHorizon", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }

    public async loadAddress(): Promise<string | undefined> {
        return await KlaytnWallet.loadAddress();
    }

    public async connect() {
        await KlaytnWallet.connect();
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return await InjeolmiContract.balanceOf(owner);
    }

    public addTokenToWallet() {
        KlaytnWallet.addToken(InjeolmiContract.address, "IJM", 18, "https://tteok.org/images/injeolmi.png");
    }

    public async sendOverHorizon(toChain: BigNumberish, receiver: string, amount: BigNumberish) {
        const owner = await KlaytnWallet.loadAddress();
        if (owner !== undefined) {
            if ((await InjeolmiContract.allowance(owner, this.address)).lt(amount)) {
                await InjeolmiContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("sendOverHorizon", toChain, receiver, amount);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("sendOverHorizon", toChain, receiver, amount);
            }
        }
    }

    public async sended(sender: string, toChain: BigNumberish, receiver: string, index: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("sended", sender, toChain, receiver, index));
    }

    public async sendCount(sender: string, toChain: BigNumberish, receiver: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("sendCount", sender, toChain, receiver));
    }

    public async receiveOverHorizon(fromChain: BigNumberish, sender: string, sendId: BigNumberish, amount: BigNumberish, signature: string) {
        await this.runWalletMethod("receiveOverHorizon", fromChain, sender, sendId, amount, signature);
    }

    public async received(receiver: string, fromChain: BigNumberish, sender: string, sendId: BigNumberish): Promise<boolean> {
        return await this.runMethod("received", receiver, fromChain, sender, sendId);
    }
}

export default new InjeolmiSenderContract();
