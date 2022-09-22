"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const PolygonWallet_1 = __importDefault(require("../polygon/PolygonWallet"));
const PaxSender_json_1 = __importDefault(require("./abi/pax/artifacts/contracts/Pax/PaxSender.sol/PaxSender.json"));
const PaxContract_1 = __importDefault(require("./PaxContract"));
const PolygonContract_1 = __importDefault(require("./PolygonContract"));
class PaxSenderContract extends PolygonContract_1.default {
    constructor() {
        super("0xcE1F2562cc390D65CCB7A505E81342a63fD838f9", PaxSender_json_1.default.abi, [
            "SetSigner",
            "SendOverHorizon",
            "ReceiveOverHorizon",
        ]);
        PaxContract_1.default.toss("Transfer", this);
        PolygonWallet_1.default.toss("connect", this);
    }
    async balanceOf(owner) {
        return await PaxContract_1.default.balanceOf(owner);
    }
    async loadAddress() {
        return await PolygonWallet_1.default.loadAddress();
    }
    async connect() {
        await PolygonWallet_1.default.connect();
    }
    addTokenToWallet() {
        PolygonWallet_1.default.addToken(PaxContract_1.default.address, "PAX", 18, "https://raw.githubusercontent.com/clonesneverdie/pax/main/docs/pax.png");
    }
    async sendOverHorizon(toChain, receiver, amount) {
        const owner = await PolygonWallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await PaxContract_1.default.allowance(owner, this.address)).lt(amount)) {
                await PaxContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
            }
            else {
                const contract = await this.connectAndGetWalletContract();
                await contract?.sendOverHorizon(toChain, receiver, amount);
            }
        }
    }
    async sended(sender, toChain, receiver, index) {
        return await this.contract.sended(sender, toChain, receiver, index);
    }
    async sendCount(sender, toChain, receiver) {
        return await this.contract.sendCount(sender, toChain, receiver);
    }
    async receiveOverHorizon(fromChain, sender, sendId, amount, signature) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.receiveOverHorizon(fromChain, sender, sendId, amount, signature);
    }
    async received(receiver, fromChain, sender, sendId) {
        return await this.contract.received(receiver, fromChain, sender, sendId);
    }
    async getTransferEvents(to, startBlock, endBlock) {
        const filter = this.contract.filters.Transfer(null, to, null);
        return await this.contract.queryFilter(filter, startBlock, endBlock);
    }
}
exports.default = new PaxSenderContract();
//# sourceMappingURL=PaxSenderContract.js.map