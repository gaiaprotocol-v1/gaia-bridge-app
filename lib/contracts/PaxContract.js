"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pax_json_1 = __importDefault(require("./abi/pax/artifacts/contracts/Pax/Pax.sol/Pax.json"));
const ERC20Contract_1 = __importDefault(require("./polygon-standard/ERC20Contract"));
class PaxContract extends ERC20Contract_1.default {
    constructor() {
        super("0x818E6b4bEa1C1FfF712464FE057d4791Efc6D552", Pax_json_1.default.abi, []);
    }
}
exports.default = new PaxContract();
//# sourceMappingURL=PaxContract.js.map