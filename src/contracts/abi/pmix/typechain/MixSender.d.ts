/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface MixSenderInterface extends ethers.utils.Interface {
  functions: {
    "received(address,uint256,address,uint256)": FunctionFragment;
    "receiveOverHorizon(uint256,uint256,address,uint256,uint256,bytes)": FunctionFragment;
    "signer()": FunctionFragment;
    "sendCount(address,uint256,address)": FunctionFragment;
    "setSigner(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "owner()": FunctionFragment;
    "isOwner()": FunctionFragment;
    "sended(address,uint256,address,uint256)": FunctionFragment;
    "mix()": FunctionFragment;
    "sendOverHorizon(uint256,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "received",
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "receiveOverHorizon",
    values: [
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "signer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sendCount",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "setSigner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sended",
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "mix", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sendOverHorizon",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "received", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "receiveOverHorizon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "signer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sendCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSigner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sended", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mix", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendOverHorizon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "SetSigner(address)": EventFragment;
    "SendOverHorizon(address,uint256,address,uint256,uint256)": EventFragment;
    "ReceiveOverHorizon(address,uint256,address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetSigner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SendOverHorizon"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReceiveOverHorizon"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class MixSender extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: MixSenderInterface;

  functions: {
    received(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "received(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    receiveOverHorizon(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "receiveOverHorizon(uint256,uint256,address,uint256,uint256,bytes)"(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    signer(overrides?: CallOverrides): Promise<[string]>;

    "signer()"(overrides?: CallOverrides): Promise<[string]>;

    sendCount(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "sendCount(address,uint256,address)"(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setSigner(
      _signer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setSigner(address)"(
      _signer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    isOwner(overrides?: CallOverrides): Promise<[boolean]>;

    "isOwner()"(overrides?: CallOverrides): Promise<[boolean]>;

    sended(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "sended(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    mix(overrides?: CallOverrides): Promise<[string]>;

    "mix()"(overrides?: CallOverrides): Promise<[string]>;

    sendOverHorizon(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "sendOverHorizon(uint256,address,uint256)"(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  received(
    arg0: string,
    arg1: BigNumberish,
    arg2: string,
    arg3: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "received(address,uint256,address,uint256)"(
    arg0: string,
    arg1: BigNumberish,
    arg2: string,
    arg3: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  receiveOverHorizon(
    fromChain: BigNumberish,
    toChain: BigNumberish,
    sender: string,
    sendId: BigNumberish,
    amount: BigNumberish,
    signature: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "receiveOverHorizon(uint256,uint256,address,uint256,uint256,bytes)"(
    fromChain: BigNumberish,
    toChain: BigNumberish,
    sender: string,
    sendId: BigNumberish,
    amount: BigNumberish,
    signature: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  sendCount(
    sender: string,
    toChain: BigNumberish,
    receiver: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "sendCount(address,uint256,address)"(
    sender: string,
    toChain: BigNumberish,
    receiver: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setSigner(
    _signer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setSigner(address)"(
    _signer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  isOwner(overrides?: CallOverrides): Promise<boolean>;

  "isOwner()"(overrides?: CallOverrides): Promise<boolean>;

  sended(
    arg0: string,
    arg1: BigNumberish,
    arg2: string,
    arg3: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "sended(address,uint256,address,uint256)"(
    arg0: string,
    arg1: BigNumberish,
    arg2: string,
    arg3: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  mix(overrides?: CallOverrides): Promise<string>;

  "mix()"(overrides?: CallOverrides): Promise<string>;

  sendOverHorizon(
    toChain: BigNumberish,
    receiver: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "sendOverHorizon(uint256,address,uint256)"(
    toChain: BigNumberish,
    receiver: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    received(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "received(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    receiveOverHorizon(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "receiveOverHorizon(uint256,uint256,address,uint256,uint256,bytes)"(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    signer(overrides?: CallOverrides): Promise<string>;

    "signer()"(overrides?: CallOverrides): Promise<string>;

    sendCount(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sendCount(address,uint256,address)"(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSigner(_signer: string, overrides?: CallOverrides): Promise<void>;

    "setSigner(address)"(
      _signer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    isOwner(overrides?: CallOverrides): Promise<boolean>;

    "isOwner()"(overrides?: CallOverrides): Promise<boolean>;

    sended(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sended(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mix(overrides?: CallOverrides): Promise<string>;

    "mix()"(overrides?: CallOverrides): Promise<string>;

    sendOverHorizon(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sendOverHorizon(uint256,address,uint256)"(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    SetSigner(signer: string | null): EventFilter;

    SendOverHorizon(
      sender: string | null,
      toChain: BigNumberish | null,
      receiver: string | null,
      sendId: null,
      amount: null
    ): EventFilter;

    ReceiveOverHorizon(
      receiver: string | null,
      fromChain: BigNumberish | null,
      sender: string | null,
      sendId: null,
      amount: null
    ): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimateGas: {
    received(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "received(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    receiveOverHorizon(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "receiveOverHorizon(uint256,uint256,address,uint256,uint256,bytes)"(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    signer(overrides?: CallOverrides): Promise<BigNumber>;

    "signer()"(overrides?: CallOverrides): Promise<BigNumber>;

    sendCount(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sendCount(address,uint256,address)"(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSigner(_signer: string, overrides?: Overrides): Promise<BigNumber>;

    "setSigner(address)"(
      _signer: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    isOwner(overrides?: CallOverrides): Promise<BigNumber>;

    "isOwner()"(overrides?: CallOverrides): Promise<BigNumber>;

    sended(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sended(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mix(overrides?: CallOverrides): Promise<BigNumber>;

    "mix()"(overrides?: CallOverrides): Promise<BigNumber>;

    sendOverHorizon(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "sendOverHorizon(uint256,address,uint256)"(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    received(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "received(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    receiveOverHorizon(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "receiveOverHorizon(uint256,uint256,address,uint256,uint256,bytes)"(
      fromChain: BigNumberish,
      toChain: BigNumberish,
      sender: string,
      sendId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    signer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "signer()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sendCount(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "sendCount(address,uint256,address)"(
      sender: string,
      toChain: BigNumberish,
      receiver: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setSigner(
      _signer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setSigner(address)"(
      _signer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "isOwner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sended(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "sended(address,uint256,address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: string,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mix(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "mix()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sendOverHorizon(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "sendOverHorizon(uint256,address,uint256)"(
      toChain: BigNumberish,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
