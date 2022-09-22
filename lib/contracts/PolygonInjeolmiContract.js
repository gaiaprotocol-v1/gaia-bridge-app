"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PolygonWallet_1 = __importDefault(require("../polygon/PolygonWallet"));
const WrappedInjeolmi_json_1 = __importDefault(require("./abi/artifacts/contracts/WrappedInjeolmi.sol/WrappedInjeolmi.json"));
const ERC20Contract_1 = __importDefault(require("./polygon-standard/ERC20Contract"));
class PolygonInjeolmiContract extends ERC20Contract_1.default {
    constructor() {
        super("0x9b23804ede399ebf86612b560Ac0451f1448185a", WrappedInjeolmi_json_1.default.abi, [
            "SetSigner",
            "SendOverHorizon",
            "ReceiveOverHorizon",
        ]);
        PolygonWallet_1.default.toss("connect", this);
    }
    async loadAddress() {
        return await PolygonWallet_1.default.loadAddress();
    }
    async connect() {
        await PolygonWallet_1.default.connect();
    }
    addTokenToWallet() {
        PolygonWallet_1.default.addToken(this.address, "IJM", 18, "https://tteok.org/images/injeolmi.png");
    }
    async sendOverHorizon(toChain, receiver, amount) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.sendOverHorizon(toChain, receiver, amount);
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
exports.default = new PolygonInjeolmiContract();
//# sourceMappingURL=PolygonInjeolmiContract.js.map