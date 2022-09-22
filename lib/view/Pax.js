"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const PaxSwaper_1 = __importDefault(require("../component/pax/PaxSwaper"));
const Layout_1 = __importDefault(require("./Layout"));
class Pax {
    constructor() {
        Layout_1.default.current.title = "PAX";
        Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".pax-view", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("img", { src: "/images/logo/pax.png", alt: "pax" })), new PaxSwaper_1.default()));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Pax;
//# sourceMappingURL=Pax.js.map