"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKlaytnPax__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "spender",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "fromChain",
                type: "uint256",
            },
            {
                name: "sender",
                type: "address",
            },
            {
                name: "sendId",
                type: "uint256",
            },
            {
                name: "amount",
                type: "uint256",
            },
            {
                name: "signature",
                type: "bytes",
            },
        ],
        name: "receiveOverHorizon",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "receiver",
                type: "address",
            },
            {
                name: "fromChain",
                type: "uint256",
            },
            {
                name: "sender",
                type: "address",
            },
            {
                name: "sendId",
                type: "uint256",
            },
        ],
        name: "received",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "signer",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "sender",
                type: "address",
            },
            {
                name: "recipient",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "sender",
                type: "address",
            },
            {
                name: "toChain",
                type: "uint256",
            },
            {
                name: "receiver",
                type: "address",
            },
        ],
        name: "sendCount",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "recipient",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "sender",
                type: "address",
            },
            {
                name: "toChain",
                type: "uint256",
            },
            {
                name: "receiver",
                type: "address",
            },
            {
                name: "sendId",
                type: "uint256",
            },
        ],
        name: "sended",
        outputs: [
            {
                name: "amount",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "owner",
                type: "address",
            },
            {
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "toChain",
                type: "uint256",
            },
            {
                name: "receiver",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "sendOverHorizon",
        outputs: [
            {
                name: "sendId",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "signer",
                type: "address",
            },
        ],
        name: "SetSigner",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                name: "toChain",
                type: "uint256",
            },
            {
                indexed: true,
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                name: "sendId",
                type: "uint256",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "SendOverHorizon",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "receiver",
                type: "address",
            },
            {
                indexed: true,
                name: "fromChain",
                type: "uint256",
            },
            {
                indexed: true,
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                name: "sendId",
                type: "uint256",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "ReceiveOverHorizon",
        type: "event",
    },
];
class IKlaytnPax__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IKlaytnPax__factory = IKlaytnPax__factory;
IKlaytnPax__factory.abi = _abi;
//# sourceMappingURL=IKlaytnPax__factory.js.map