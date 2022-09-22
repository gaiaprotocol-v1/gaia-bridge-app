"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const IjmSwaper_1 = __importDefault(require("../component/ijm/IjmSwaper"));
const Layout_1 = __importDefault(require("./Layout"));
class Ijm {
    constructor() {
        Layout_1.default.current.title = "IJM";
        Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".ijm-view", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("img", { src: "/images/logo/ijm.png", alt: "ijm" })), new IjmSwaper_1.default()));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Ijm;
//# sourceMappingURL=Ijm.js.map