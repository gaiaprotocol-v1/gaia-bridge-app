"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const MobileMenu_1 = __importDefault(require("../component/shared/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../component/shared/menu/PCMenu"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        let select;
        skydapp_browser_1.BodyNode.append((this.container = (0, skydapp_browser_1.el)(".layout", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)(".nav", (0, skydapp_browser_1.el)(".logo", (0, skydapp_browser_1.el)("a", { click: () => { ViewUtil_1.default.go("/"); } }, (0, skydapp_browser_1.el)("img", { src: "/images/logo/gaia-bridge.png", alt: "gaia-bridge" }), (0, skydapp_browser_1.el)("h1", "Gaia Bridge"))), new PCMenu_1.default(), (0, skydapp_browser_1.el)(".right", (0, skydapp_browser_1.el)("a.menu-button", (0, skydapp_browser_1.el)("img", { src: "/images/icn/menu.svg", alt: "menu" }), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 170, top: rect.bottom }).appendTo(skydapp_browser_1.BodyNode);
            },
        })))), (0, skydapp_browser_1.el)("main", (this.content = (0, skydapp_browser_1.el)(".content"))), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)(".footer-container", (0, skydapp_browser_1.el)(".sns", (0, skydapp_browser_1.el)("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" }, (0, skydapp_browser_1.el)("img", { src: "/images/icn/discord.svg" })), (0, skydapp_browser_1.el)("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" }, (0, skydapp_browser_1.el)("img", { src: "/images/icn/twitter.svg" }))), (0, skydapp_browser_1.el)(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED"))))));
    }
    set title(title) {
        document.title = `${title} | Gaia Bridge`;
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map