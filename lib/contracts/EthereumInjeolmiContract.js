"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EthereumWallet_1 = __importDefault(require("../ethereum/EthereumWallet"));
const WrappedInjeolmi_json_1 = __importDefault(require("./abi/artifacts/contracts/WrappedInjeolmi.sol/WrappedInjeolmi.json"));
const ERC20Contract_1 = __importDefault(require("./ethereum-standard/ERC20Contract"));
class EthereumInjeolmiContract extends ERC20Contract_1.default {
    constructor() {
        super("0xBeA76c71929788Ab20e17759eaC115798F9aEf27", WrappedInjeolmi_json_1.default.abi, [
            "SetSigner",
            "SendOverHorizon",
            "ReceiveOverHorizon",
        ]);
        EthereumWallet_1.default.toss("connect", this);
    }
    async loadAddress() {
        return await EthereumWallet_1.default.loadAddress();
    }
    async connect() {
        await EthereumWallet_1.default.connect();
    }
    addTokenToWallet() {
        EthereumWallet_1.default.addToken(this.address, "IJM", 18, "https://tteok.org/images/injeolmi.png");
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
exports.default = new EthereumInjeolmiContract();
//# sourceMappingURL=EthereumInjeolmiContract.js.map