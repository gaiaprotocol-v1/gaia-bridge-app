"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
class PaxSended extends skydapp_browser_1.DomNode {
    constructor(fromSender, toSender, fromChain, toChain, sender, receiver, sendId, retry) {
        super("tbody");
        this.fromSender = fromSender;
        this.toSender = toSender;
        this.fromChain = fromChain;
        this.toChain = toChain;
        this.sender = sender;
        this.receiver = receiver;
        this.sendId = sendId;
        this.retry = retry;
        this.receiveOverHorizonHandler = async (receiver, fromChain, sender, sendId) => {
            if (receiver === this.receiver && fromChain.toNumber() === this.fromChain && sender === this.sender && sendId.toNumber() === this.sendId) {
                this.load();
            }
        };
        this.load();
        this.toSender.on("ReceiveOverHorizon", this.receiveOverHorizonHandler);
    }
    async load() {
        const sended = await this.fromSender.sended(this.sender, this.toChain, this.receiver, this.sendId);
        const received = await this.toSender.received(this.receiver, this.fromChain, this.sender, this.sendId);
        this.empty().append((0, skydapp_browser_1.el)(".history-item", (0, skydapp_browser_1.el)("p", `${await this.getChainName(this.fromChain)}`), (0, skydapp_browser_1.el)("p", `${await this.getChainName(this.toChain)}`), (0, skydapp_browser_1.el)("p", `${await this.getFormatting(sended)} PAX`), (0, skydapp_browser_1.el)("p", received === true ? (0, skydapp_browser_1.el)(".done", "전송 완료") : (0, skydapp_browser_1.el)("a.retry-button", "재시도", {
            click: () => this.retry(),
        }))));
    }
    async getChainName(chainId) {
        switch (chainId) {
            case 1:
                return "Ethereum";
            case 137:
                return "Polygon";
            case 8217:
                return "Klaytn";
        }
    }
    async getFormatting(balance) {
        console.log(balance);
        let balanceDisplay = ethers_1.utils.formatEther(balance);
        balanceDisplay = (+balanceDisplay).toFixed(4);
        return balanceDisplay;
    }
    delete() {
        this.toSender.off("ReceiveOverHorizon", this.receiveOverHorizonHandler);
        super.delete();
    }
}
exports.default = PaxSended;
//# sourceMappingURL=PaxSended.js.map