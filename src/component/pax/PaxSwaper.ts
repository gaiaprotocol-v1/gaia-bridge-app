import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, msg } from "skydapp-browser";
import { SkyUtil } from "skydapp-common";
import superagent from "superagent";
import Form from "./PaxForm";
import Sended from "./PaxSended";

export default class PaxSwaper extends DomNode {
    private fromForm: Form;
    private toForm: Form;

    private sendedList: DomNode;

    constructor() {
        super(".pax-swaper");

        this.append(
            el(
                ".form-container",
                (this.fromForm = new Form(this, 8217, true)),
                el("img.arrow", { src: "/images/icn/arrow-right.svg", height: "50", alt: "arrow-right" }),
                (this.toForm = new Form(this, 1))
            ),
            el(".fee-container",
                el(".content",
                    el("h3", "Fees"),
                ),
                el("p", "0 PAX"),
            ),
            el(".received-container",
                el("h3", "Estimated Received"),
                el("p", "0 PAX"),
            ),
            el(".warning",
                el("img", { src: "/images/icn/warning.svg", alt: "warning icon" }),
                el("p", "브릿지 이용 시 양 체인에 가스비가 발생됩니다.\n보내는 체인이 이더리움일 경우 32컨펌 후 Recieve 서명이 필요합니다"),
            ),
            el(".button-container",
                el("button", "Approve", { click: () => { } }),
                el("button", "Transfer"),
            ),
            el(".history",
                el("h2", "History"),
                el("p", "트랜잭션이 한번 시작되면 되돌릴 수 없습니다.\nTransfer후 Recieve 까지 완료되어야 체인 간 전송이 완료됩니다"),
                el(".sended-title",
                    el("h3", "From Chain"),
                    el("h3", "To Chain"),
                    el("h3", "Amount"),
                    el("h3", "Status"),
                ),
                (this.sendedList = el("table.sended-list"))
            )
        );

        this.fromForm.on(
            "changeChain",
            (chainId: number, originChainId: number) => {
                if (this.toForm.chainId === chainId) {
                    this.toForm.changeChain(originChainId);
                }
                this.loadHistory();
            }
        );

        this.toForm.on("changeChain", (chainId: number, originChainId: number) => {
            if (this.fromForm.chainId === chainId) {
                this.fromForm.changeChain(originChainId);
            }
            this.loadHistory();
        });

        this.loadHistory();
        this.fromForm.on("connect", () => this.loadHistory());
        this.toForm.on("connect", () => this.loadHistory());
    }

    private loadHistoryNonce = 0;

    private async loadHistory() {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined
        ) {
            const sender = await this.fromForm.sender.loadAddress();
            const receiver = await this.toForm.sender.loadAddress();
            if (sender !== undefined && receiver !== undefined) {
                const count = await this.fromForm.sender.sendCount(
                    sender,
                    this.toForm.chainId,
                    receiver
                );
                this.loadHistoryNonce += 1;
                const nonce = this.loadHistoryNonce;
                this.sendedList.empty();

                SkyUtil.repeatResultAsync(count.toNumber(), async (sendId) => {
                    if (this.loadHistoryNonce === nonce) {
                        this.addSended(sender, receiver, BigNumber.from(sendId));
                    }
                });
            }
        }
    }

    public addSended(sender: string, receiver: string, sendId: BigNumber) {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined
        ) {
            new Sended(
                this.fromForm.sender,
                this.toForm.sender,
                this.fromForm.chainId,
                this.toForm.chainId,
                sender,
                receiver,
                sendId.toNumber(),
                async () => {
                    if (this.fromForm.sender !== undefined) {
                        const sended = await this.fromForm.sender.sended(
                            sender,
                            this.toForm.chainId,
                            receiver,
                            sendId
                        );
                        this.receiveOverHorizon(
                            receiver,
                            this.toForm.chainId,
                            sender,
                            sendId,
                            sended
                        );
                    }
                }
            ).appendTo(this.sendedList, 0);
        }
    }

    public async sendOverHorizon(amount: BigNumberish) {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined
        ) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver !== undefined) {
                await this.fromForm.sender.sendOverHorizon(
                    this.toForm.chainId,
                    receiver,
                    amount
                );
            }
        }
    }

    public async receiveOverHorizon(
        _receiver: string,
        toChain: BigNumberish,
        sender: string,
        sendId: BigNumber,
        amount: BigNumberish
    ) {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined &&
            this.toForm.chainId.toString() === toChain.toString()
        ) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver === _receiver) {
                try {
                    const result = await superagent
                        .get(
                            `https://api.chainhorizon.org/pax/signsend?receiver=${receiver}&fromChain=${this.fromForm.chainId
                            }&toChain=${this.toForm.chainId
                            }&sender=${sender}&sendId=${sendId}&amount=${amount.toString()}`
                        )
                        .send();
                    await this.toForm.sender.receiveOverHorizon(
                        this.fromForm.chainId,
                        sender,
                        sendId,
                        amount,
                        result.text
                    );
                } catch (error: any) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    }
}
