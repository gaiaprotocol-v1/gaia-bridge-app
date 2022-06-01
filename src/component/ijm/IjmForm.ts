
import { BigNumber, utils } from "ethers";
import { DomNode, el, msg } from "skydapp-browser";
import BSCInjeolmiContract from "../../contracts/BSCInjeolmiContract";
import EthereumInjeolmiContract from "../../contracts/EthereumInjeolmiContract";
import InjeolmiSenderContract from "../../contracts/InjeolmiSenderContract";
import InjeolmiSenderInterface from "../../contracts/InjeolmiSenderInterface";
import PolygonInjeolmiContract from "../../contracts/PolygonInjeolmiContract";
import Swaper from "./IjmSwaper";

export default class IjmForm extends DomNode {
    public sender: InjeolmiSenderInterface | undefined;

    private chainIcon: DomNode<HTMLImageElement>;
    private chainSelect: DomNode<HTMLSelectElement>;
    private balanceDisplay: DomNode;
    private inputContainer: DomNode;
    private buttonContainer: DomNode;

    constructor(
        private swaper: Swaper,
        public chainId: number,
        private isFrom: boolean = false
    ) {
        super(".form");
        this.append(
            el(".chain",
                this.chainIcon = el("img", { alt: "chain logo" }),
                isFrom ? el("p", "FROM") : el("p.help-text", "TO"),
                this.chainSelect = el(
                    "select",
                    el("option", "Klaytn", {
                        value: "8217",
                    }),
                    el("option", "BSC", {
                        value: "56",
                    }),
                    el("option", "Ethereum", {
                        value: "1",
                    }),
                    el("option", "Polygon", {
                        value: "137",
                    }),
                    {
                        change: () => {
                            const originChainId = this.chainId;
                            this.changeChain(parseInt(this.chainSelect.domElement.value, 10));
                            this.fireEvent("changeChain", this.chainId, originChainId);
                        },
                    }
                ) as any,
            ),
            (this.balanceDisplay = el(".balance")),
            (this.inputContainer = el(".input-container")),
            (this.buttonContainer = el(".button-container"))
        );
        this.changeChain(chainId);
    }

    public async changeChain(chainId: number) {
        this.chainId = chainId;
        this.chainSelect.domElement.value = String(chainId);

        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendOverHorizon", this.sendOverHorizonHandler);

        if (chainId === 8217) {
            this.sender = InjeolmiSenderContract;
            this.chainIcon.domElement.src = "/images/icn/klaytn.svg";
        } else if (chainId === 56) {
            this.sender = BSCInjeolmiContract;
            this.chainIcon.domElement.src = "/images/icn/bsc.svg";
        } else if (chainId === 1) {
            this.sender = EthereumInjeolmiContract;
            this.chainIcon.domElement.src = "/images/icn/ethereum.svg";
        } else if (chainId === 137) {
            this.sender = PolygonInjeolmiContract;
            this.chainIcon.domElement.src = "/images/icn/polygon.svg";
        }
        await this.loadBalance();

        this.sender?.on("connect", this.connectHandler);
        this.sender?.on("Transfer", this.transferHandler);
        this.sender?.on("SendOverHorizon", this.sendOverHorizonHandler);
    }

    private async loadBalance() {
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
                    const input: DomNode<HTMLInputElement> = el("input", {
                        placeholder: "Amount",
                    });
                    input.appendTo(this.inputContainer);

                    this.buttonContainer.append(
                        el("a.send-button", "Send", {
                            click: () =>
                                this.swaper.sendOverHorizon(
                                    utils.parseEther(input.domElement.value)
                                ),
                        })
                    );
                }
            } else {
                this.balanceDisplay.empty().appendText("Failed to load balance");
                this.buttonContainer.append(
                    el("a.connect-button", "Connect Wallet", {
                        click: () => this.sender?.connect(),
                    })
                );
            }
        }
    }

    private connectHandler = async () => {
        this.fireEvent("connect");
        this.loadBalance();
    };

    private transferHandler = async (from: string, to: string) => {
        const owner = await this.sender?.loadAddress();
        if (from === owner || to === owner) {
            this.loadBalance();
        }
    };

    private sendOverHorizonHandler = async (
        sender: string,
        toChain: BigNumber,
        receiver: string,
        sendId: BigNumber,
        amount: BigNumber
    ) => {
        this.swaper.receiveOverHorizon(receiver, toChain, sender, sendId, amount);
        const owner = await this.sender?.loadAddress();
        if (sender === owner) {
            this.swaper.addSended(sender, receiver, sendId);
        }
    };

    private async getFormatting(balance: BigNumber) {
        console.log(balance)
        let balanceDisplay = utils.formatEther(balance!)
        balanceDisplay = (+balanceDisplay).toFixed(4);
        return balanceDisplay;
    }

    public delete() {
        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendOverHorizon", this.sendOverHorizonHandler);
        super.delete();
    }
}
