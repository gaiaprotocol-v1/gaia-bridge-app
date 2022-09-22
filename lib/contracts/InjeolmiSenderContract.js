"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const KlaytnWallet_1 = __importDefault(require("../klaytn/KlaytnWallet"));
const InjeolmiSender_json_1 = __importDefault(require("./abi/artifacts/contracts/InjeolmiSender.sol/InjeolmiSender.json"));
const InjeolmiContract_1 = __importDefault(require("./InjeolmiContract"));
const KlaytnContract_1 = __importDefault(require("./KlaytnContract"));
class InjeolmiSenderContract extends KlaytnContract_1.default {
    constructor() {
        super("0x19f112c05Fad52e5C58E5A4628548aBB45bc8697", InjeolmiSender_json_1.default.abi);
        KlaytnWallet_1.default.toss("connect", this);
        this.watch();
    }
    async watch() {
        let prevBlock = await Klaytn_1.default.loadBlockNumber();
        setInterval(async () => {
            const currentBlock = await Klaytn_1.default.loadBlockNumber();
            const transferEvents = await InjeolmiContract_1.default.getTransferEvents(prevBlock, currentBlock);
            for (const event of transferEvents) {
                this.fireEvent("Transfer", event.returnValues[0], event.returnValues[1], bignumber_1.BigNumber.from(event.returnValues[2]));
            }
            const sendOverHorizonEvents = await this.getSendOverHorizonEvents(prevBlock, currentBlock);
            for (const event of sendOverHorizonEvents) {
                this.fireEvent("SendOverHorizon", event.returnValues[0], bignumber_1.BigNumber.from(event.returnValues[1]), event.returnValues[2], bignumber_1.BigNumber.from(event.returnValues[3]), bignumber_1.BigNumber.from(event.returnValues[4]));
            }
            const receiveOverHorizonEvents = await this.getReceiveOverHorizonEvents(prevBlock, currentBlock);
            for (const event of receiveOverHorizonEvents) {
                this.fireEvent("ReceiveOverHorizon", event.returnValues[0], bignumber_1.BigNumber.from(event.returnValues[1]), event.returnValues[2], bignumber_1.BigNumber.from(event.returnValues[3]), bignumber_1.BigNumber.from(event.returnValues[4]));
            }
            prevBlock = currentBlock + 1;
        }, 2000);
    }
    async getSendOverHorizonEvents(startBlock, endBlock) {
        const events = await this.contract.getPastEvents("SendOverHorizon", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }
    async getReceiveOverHorizonEvents(startBlock, endBlock) {
        const events = await this.contract.getPastEvents("ReceiveOverHorizon", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }
    async loadAddress() {
        return await KlaytnWallet_1.default.loadAddress();
    }
    async connect() {
        await KlaytnWallet_1.default.connect();
    }
    async balanceOf(owner) {
        return await InjeolmiContract_1.default.balanceOf(owner);
    }
    addTokenToWallet() {
        KlaytnWallet_1.default.addToken(InjeolmiContract_1.default.address, "IJM", 18, "https://tteok.org/images/injeolmi.png");
    }
    async sendOverHorizon(toChain, receiver, amount) {
        const owner = await KlaytnWallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await InjeolmiContract_1.default.allowance(owner, this.address)).lt(amount)) {
                await InjeolmiContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("sendOverHorizon", toChain, receiver, amount);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("sendOverHorizon", toChain, receiver, amount);
            }
        }
    }
    async sended(sender, toChain, receiver, index) {
        return bignumber_1.BigNumber.from(await this.runMethod("sended", sender, toChain, receiver, index));
    }
    async sendCount(sender, toChain, receiver) {
        return bignumber_1.BigNumber.from(await this.runMethod("sendCount", sender, toChain, receiver));
    }
    async receiveOverHorizon(fromChain, sender, sendId, amount, signature) {
        await this.runWalletMethod("receiveOverHorizon", fromChain, sender, sendId, amount, signature);
    }
    async received(receiver, fromChain, sender, sendId) {
        return await this.runMethod("received", receiver, fromChain, sender, sendId);
    }
}
exports.default = new InjeolmiSenderContract();
//# sourceMappingURL=InjeolmiSenderContract.js.map