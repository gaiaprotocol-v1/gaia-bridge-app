import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import IjmSwaper from "../component/ijm/IjmSwaper";
import Layout from "./Layout";

export default class Ijm implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "IJM";
        Layout.current.content.append(
            this.container = el(".ijm-view",
                el("header",
                    el("img", { src: "/images/logo/ijm.png", alt: "ijm" }),
                ),
                new IjmSwaper(),
            ),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }

}