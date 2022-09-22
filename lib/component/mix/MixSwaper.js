"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const superagent_1 = __importDefault(require("superagent"));
const MixForm_1 = __importDefault(require("./MixForm"));
const MixSended_1 = __importDefault(require("./MixSended"));
class MixSwaper extends skydapp_browser_1.DomNode {
    constructor() {
        super(".mix-swaper");
        this.loadHistoryNonce = 0;
        this.append((0, skydapp_browser_1.el)(".form-container", (this.fromForm = new MixForm_1.default(this, 8217, true)), (0, skydapp_browser_1.el)("img.arrow", { src: "/images/icn/arrow-right.svg", height: "50", alt: "arrow-right" }), (this.toForm = new MixForm_1.default(this, 1))), (0, skydapp_browser_1.el)(".fee-container", (0, skydapp_browser_1.el)(".content", (0, skydapp_browser_1.el)("h3", "Fees")), (0, skydapp_browser_1.el)("p", "0 MIX")), (0, skydapp_browser_1.el)(".received-container", (0, skydapp_browser_1.el)("h3", "Estimated Received"), (0, skydapp_browser_1.el)("p", "0 MIX")), (0, skydapp_browser_1.el)(".warning", (0, skydapp_browser_1.el)("img", { src: "/images/icn/warning.svg", alt: "warning icon" }), (0, skydapp_browser_1.el)("p", "브릿지 이용 시 양 체인에 가스비가 발생됩니다.\n보내는 체인이 이더리움일 경우 32컨펌 후 Recieve 서명이 필요합니다")), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("button", "Approve", { click: () => { } }), (0, skydapp_browser_1.el)("button", "Transfer")), (0, skydapp_browser_1.el)(".history", (0, skydapp_browser_1.el)("h2", "History"), (0, skydapp_browser_1.el)("p", "트랜잭션이 한번 시작되면 되돌릴 수 없습니다.\nTransfer후 Recieve 까지 완료되어야 체인 간 전송이 완료됩니다"), (0, skydapp_browser_1.el)(".sended-title", (0, skydapp_browser_1.el)("h3", "From Chain"), (0, skydapp_browser_1.el)("h3", "To Chain"), (0, skydapp_browser_1.el)("h3", "Amount"), (0, skydapp_browser_1.el)("h3", "Status")), (this.sendedList = (0, skydapp_browser_1.el)("table.sended-list"))));
        this.fromForm.on("changeChain", (chainId, originChainId) => {
            if (this.toForm.chainId === chainId) {
                this.toForm.changeChain(originChainId);
            }
            this.loadHistory();
        });
        this.toForm.on("changeChain", (chainId, originChainId) => {
            if (this.fromForm.chainId === chainId) {
                this.fromForm.changeChain(originChainId);
            }
            this.loadHistory();
        });
        this.loadHistory();
        this.fromForm.on("connect", () => this.loadHistory());
        this.toForm.on("connect", () => this.loadHistory());
    }
    async loadHistory() {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            const sender = await this.fromForm.sender.loadAddress();
            const receiver = await this.toForm.sender.loadAddress();
            if (sender !== undefined && receiver !== undefined) {
                const count = await this.fromForm.sender.sendCount(sender, this.toForm.chainId, receiver);
                this.loadHistoryNonce += 1;
                const nonce = this.loadHistoryNonce;
                this.sendedList.empty();
                skydapp_common_1.SkyUtil.repeatResultAsync(count.toNumber(), async (sendId) => {
                    if (this.loadHistoryNonce === nonce) {
                        this.addSended(sender, receiver, bignumber_1.BigNumber.from(sendId));
                    }
                });
            }
        }
    }
    addSended(sender, receiver, sendId) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            new MixSended_1.default(this.fromForm.sender, this.toForm.sender, this.fromForm.chainId, this.toForm.chainId, sender, receiver, sendId.toNumber(), async () => {
                if (this.fromForm.sender !== undefined) {
                    const sended = await this.fromForm.sender.sended(sender, this.toForm.chainId, receiver, sendId);
                    this.receiveOverHorizon(receiver, this.toForm.chainId, sender, sendId, sended);
                }
            }).appendTo(this.sendedList, 0);
        }
    }
    async sendOverHorizon(amount) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver !== undefined) {
                await this.fromForm.sender.sendOverHorizon(this.toForm.chainId, receiver, amount);
            }
        }
    }
    async receiveOverHorizon(_receiver, toChain, sender, sendId, amount) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined &&
            this.toForm.chainId.toString() === toChain.toString()) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver === _receiver) {
                try {
                    const result = await superagent_1.default
                        .get(`https://api.gaiabridge.com/mix/signsend?receiver=${receiver}&fromChain=${this.fromForm.chainId}&toChain=${this.toForm.chainId}&sender=${sender}&sendId=${sendId}&amount=${amount.toString()}`)
                        .send();
                    await this.toForm.sender.receiveOverHorizon(this.fromForm.chainId, this.toForm.chainId, sender, sendId, amount, result.text);
                }
                catch (error) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    }
}
exports.default = MixSwaper;
//# sourceMappingURL=MixSwaper.js.map