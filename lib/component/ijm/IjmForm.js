"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const BSCInjeolmiContract_1 = __importDefault(require("../../contracts/BSCInjeolmiContract"));
const EthereumInjeolmiContract_1 = __importDefault(require("../../contracts/EthereumInjeolmiContract"));
const InjeolmiSenderContract_1 = __importDefault(require("../../contracts/InjeolmiSenderContract"));
const PolygonInjeolmiContract_1 = __importDefault(require("../../contracts/PolygonInjeolmiContract"));
class IjmForm extends skydapp_browser_1.DomNode {
    constructor(swaper, chainId, isFrom = false) {
        super(".form");
        this.swaper = swaper;
        this.chainId = chainId;
        this.isFrom = isFrom;
        this.connectHandler = async () => {
            this.fireEvent("connect");
            this.loadBalance();
        };
        this.transferHandler = async (from, to) => {
            const owner = await this.sender?.loadAddress();
            if (from === owner || to === owner) {
                this.loadBalance();
            }
        };
        this.sendOverHorizonHandler = async (sender, toChain, receiver, sendId, amount) => {
            this.swaper.receiveOverHorizon(receiver, toChain, sender, sendId, amount);
            const owner = await this.sender?.loadAddress();
            if (sender === owner) {
                this.swaper.addSended(sender, receiver, sendId);
            }
        };
        this.append((0, skydapp_browser_1.el)(".chain", this.chainIcon = (0, skydapp_browser_1.el)("img", { alt: "chain logo" }), isFrom ? (0, skydapp_browser_1.el)("p", "FROM") : (0, skydapp_browser_1.el)("p.help-text", "TO"), this.chainSelect = (0, skydapp_browser_1.el)("select", (0, skydapp_browser_1.el)("option", "Klaytn", {
            value: "8217",
        }), (0, skydapp_browser_1.el)("option", "BSC", {
            value: "56",
        }), (0, skydapp_browser_1.el)("option", "Ethereum", {
            value: "1",
        }), (0, skydapp_browser_1.el)("option", "Polygon", {
            value: "137",
        }), {
            change: () => {
                const originChainId = this.chainId;
                this.changeChain(parseInt(this.chainSelect.domElement.value, 10));
                this.fireEvent("changeChain", this.chainId, originChainId);
            },
        })), (this.balanceDisplay = (0, skydapp_browser_1.el)(".balance")), (this.inputContainer = (0, skydapp_browser_1.el)(".input-container")), (this.buttonContainer = (0, skydapp_browser_1.el)(".button-container")));
        this.changeChain(chainId);
    }
    async changeChain(chainId) {
        this.chainId = chainId;
        this.chainSelect.domElement.value = String(chainId);
        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendOverHorizon", this.sendOverHorizonHandler);
        if (chainId === 8217) {
            this.sender = InjeolmiSenderContract_1.default;
            this.chainIcon.domElement.src = "/images/icn/klaytn.svg";
        }
        else if (chainId === 56) {
            this.sender = BSCInjeolmiContract_1.default;
            this.chainIcon.domElement.src = "/images/icn/bsc.svg";
        }
        else if (chainId === 1) {
            this.sender = EthereumInjeolmiContract_1.default;
            this.chainIcon.domElement.src = "/images/icn/ethereum.svg";
        }
        else if (chainId === 137) {
            this.sender = PolygonInjeolmiContract_1.default;
            this.chainIcon.domElement.src = "/images/icn/polygon.svg";
        }
        await this.loadBalance();
        this.sender?.on("connect", this.connectHandler);
        this.sender?.on("Transfer", this.transferHandler);
        this.sender?.on("SendOverHorizon", this.sendOverHorizonHandler);
    }
    async loadBalance() {
        this.inputContainer.empty();
        this.buttonContainer.empty();
        if (this.sender !== undefined) {
            const owner = await this.sender.loadAddress();
            if (owner !== undefined) {
                const balance = await this.sender.balanceOf(owner);
                this.balanceDisplay
                    .empty()
                    .appendText(`${await this.getFormatting(balance)} IJM`);
                if (this.isFrom === true) {
                    const input = (0, skydapp_browser_1.el)("input", {
                        placeholder: "Amount",
                    });
                    input.appendTo(this.inputContainer);
                    this.buttonContainer.append((0, skydapp_browser_1.el)("a.send-button", "Send", {
                        click: () => this.swaper.sendOverHorizon(ethers_1.utils.parseEther(input.domElement.value)),
                    }));
                }
            }
            else {
                this.balanceDisplay.empty().appendText("Failed to load balance");
                this.buttonContainer.append((0, skydapp_browser_1.el)("a.connect-button", "Connect Wallet", {
                    click: () => this.sender?.connect(),
                }));
            }
        }
    }
    async getFormatting(balance) {
        console.log(balance);
        let balanceDisplay = ethers_1.utils.formatEther(balance);
        balanceDisplay = (+balanceDisplay).toFixed(4);
        return balanceDisplay;
    }
    delete() {
        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendOverHorizon", this.sendOverHorizonHandler);
        super.delete();
    }
}
exports.default = IjmForm;
//# sourceMappingURL=IjmForm.js.map