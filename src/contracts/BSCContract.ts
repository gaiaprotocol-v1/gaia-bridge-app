import { ContractInterface, ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import BSCNetworkProvider from "../bsc/BSCNetworkProvider";
import BSCWallet from "../bsc/BSCWallet";

export default abstract class BSCContract<CT extends ethers.Contract> extends EventContainer {

    protected walletContract: CT | undefined;
    protected contract: CT;

    constructor(public address: string, private abi: ContractInterface, eventNames: string[]) {
        super();
        this.contract = new ethers.Contract(address, abi, BSCNetworkProvider.provider).connect(BSCNetworkProvider.signer) as CT;
        for (const eventName of eventNames) {
            this.contract.on(eventName, (...args) => {
                this.fireEvent(eventName, ...args);
            });
        }
        BSCWallet.on("chainChanged", () => this.walletContract = undefined);
    }

    public get interface() {
        return this.contract.interface;
    }

    public async getWalletContract() {
        if (await BSCWallet.connected() === true) {
            if (this.walletContract === undefined && BSCWallet.signer !== undefined) {
                this.walletContract = new ethers.Contract(this.address, this.abi, BSCWallet.provider).connect(BSCWallet.signer) as CT;
            }
            return this.walletContract;
        }
    }

    public async connectAndGetWalletContract() {
        if (await BSCWallet.loadChainId() !== 56) {
            alert("Wrong Network. Please change to BSC.");
            BSCWallet.disconnectFromWalletConnect();
        } else {
            if (await BSCWallet.connected() !== true) {
                await BSCWallet.connect();
            }
            if (this.walletContract === undefined && BSCWallet.signer !== undefined) {
                this.walletContract = new ethers.Contract(this.address, this.abi, BSCWallet.provider).connect(BSCWallet.signer) as CT;
            }
            return this.walletContract;
        }
    }
}
