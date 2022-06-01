import PaxArtifact from "./abi/pax/artifacts/contracts/Pax/Pax.sol/Pax.json";
import ERC20Contract from "./polygon-standard/ERC20Contract";

class PaxContract extends ERC20Contract<any> {

    constructor() {
        super("0x818E6b4bEa1C1FfF712464FE057d4791Efc6D552", PaxArtifact.abi, []);
    }
}

export default new PaxContract();
