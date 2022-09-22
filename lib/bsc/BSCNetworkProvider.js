"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_common_1 = require("skydapp-common");
class BSCNetworkProvider extends skydapp_common_1.EventContainer {
    constructor() {
        super();
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
        this.signer = this.provider.getSigner(ethers_1.ethers.constants.AddressZero);
    }
    async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }
    async getBalance(address) {
        return await this.provider.getBalance(address);
    }
}
exports.default = new BSCNetworkProvider();
//# sourceMappingURL=BSCNetworkProvider.js.map