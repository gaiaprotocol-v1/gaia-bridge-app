import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import MixSwaper from "../component/mix/MixSwaper";
import Layout from "./Layout";

export default class Mix implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "MIX";
        Layout.current.content.append(
            this.container = el(".mix-view",
                new MixSwaper(),
            ),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }

}