import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import PaxSwaper from "../component/pax/PaxSwaper";
import Layout from "./Layout";

export default class Pax implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "PAX";
        Layout.current.content.append(
            this.container = el(".pax-view",
                el("header",
                    el("img", { src: "/images/logo/pax.png", alt: "pax" }),
                ),
                new PaxSwaper(),
            ),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }

}