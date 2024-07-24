/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
} from "@alephium/web3";
import { default as MapTestContractJson } from "../test/MapTest.ral.json";
import { getContractByCodeHash } from "./contracts";
import {
  AddStruct1,
  AddStruct2,
  Balances,
  MapValue,
  TokenBalance,
  AllStructs,
} from "./types";
import { RalphMap } from "@alephium/web3";

// Custom types for the contract
export namespace MapTestTypes {
  export type State = Omit<ContractState<any>, "fields">;

  export interface CallMethodTable {
    insert: {
      params: CallContractParams<{ key: Address; value: MapValue }>;
      result: CallContractResult<null>;
    };
    update: {
      params: CallContractParams<{ key: Address }>;
      result: CallContractResult<null>;
    };
    remove: {
      params: CallContractParams<{ key: Address }>;
      result: CallContractResult<null>;
    };
    getValue: {
      params: CallContractParams<{ key: Address }>;
      result: CallContractResult<MapValue>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };

  export interface SignExecuteMethodTable {
    insert: {
      params: SignExecuteContractMethodParams<{
        key: Address;
        value: MapValue;
      }>;
      result: SignExecuteScriptTxResult;
    };
    update: {
      params: SignExecuteContractMethodParams<{ key: Address }>;
      result: SignExecuteScriptTxResult;
    };
    remove: {
      params: SignExecuteContractMethodParams<{ key: Address }>;
      result: SignExecuteScriptTxResult;
    };
    getValue: {
      params: SignExecuteContractMethodParams<{ key: Address }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<MapTestInstance, {}> {
  encodeFields() {
    return encodeContractFields({}, this.contract.fieldsSig, AllStructs);
  }

  at(address: string): MapTestInstance {
    return new MapTestInstance(address);
  }

  tests = {
    insert: async (
      params: Omit<
        TestContractParams<
          never,
          { key: Address; value: MapValue },
          {
            map0?: Map<Address, MapValue>;
            map1?: Map<bigint, bigint>;
            map2?: Map<HexString, bigint>;
          }
        >,
        "initialFields"
      >
    ): Promise<
      TestContractResult<
        null,
        {
          map0?: Map<Address, MapValue>;
          map1?: Map<bigint, bigint>;
          map2?: Map<HexString, bigint>;
        }
      >
    > => {
      return testMethod(this, "insert", params, getContractByCodeHash);
    },
    update: async (
      params: Omit<
        TestContractParams<
          never,
          { key: Address },
          {
            map0?: Map<Address, MapValue>;
            map1?: Map<bigint, bigint>;
            map2?: Map<HexString, bigint>;
          }
        >,
        "initialFields"
      >
    ): Promise<
      TestContractResult<
        null,
        {
          map0?: Map<Address, MapValue>;
          map1?: Map<bigint, bigint>;
          map2?: Map<HexString, bigint>;
        }
      >
    > => {
      return testMethod(this, "update", params, getContractByCodeHash);
    },
    remove: async (
      params: Omit<
        TestContractParams<
          never,
          { key: Address },
          {
            map0?: Map<Address, MapValue>;
            map1?: Map<bigint, bigint>;
            map2?: Map<HexString, bigint>;
          }
        >,
        "initialFields"
      >
    ): Promise<
      TestContractResult<
        null,
        {
          map0?: Map<Address, MapValue>;
          map1?: Map<bigint, bigint>;
          map2?: Map<HexString, bigint>;
        }
      >
    > => {
      return testMethod(this, "remove", params, getContractByCodeHash);
    },
    getValue: async (
      params: Omit<
        TestContractParams<
          never,
          { key: Address },
          {
            map0?: Map<Address, MapValue>;
            map1?: Map<bigint, bigint>;
            map2?: Map<HexString, bigint>;
          }
        >,
        "initialFields"
      >
    ): Promise<
      TestContractResult<
        MapValue,
        {
          map0?: Map<Address, MapValue>;
          map1?: Map<bigint, bigint>;
          map2?: Map<HexString, bigint>;
        }
      >
    > => {
      return testMethod(this, "getValue", params, getContractByCodeHash);
    },
  };
}

// Use this object to test and deploy the contract
export const MapTest = new Factory(
  Contract.fromJson(
    MapTestContractJson,
    "=6-2+a8=1-3+128=2-2+ea=1+2=1-2+7=10-2+4025=50+7a7e0214696e73657274206174206d617020706174683a2000=56+7a7e0214696e73657274206174206d617020706174683a2000=54+7a7e0214696e73657274206174206d617020706174683a2000=280-2+33=124+7a7e021472656d6f7665206174206d617020706174683a2000=46+7a7e021472656d6f7665206174206d617020706174683a2000=48+7a7e021472656d6f7665206174206d617020706174683a2000=96",
    "31aed0ff7b29f2cbc2d8360a83f31af4e9db00f0084a7406bd84b7745181373d",
    AllStructs
  )
);

// Use this class to interact with the blockchain
export class MapTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  maps = {
    map0: new RalphMap<Address, MapValue>(
      MapTest.contract,
      this.contractId,
      "map0"
    ),
    map1: new RalphMap<bigint, bigint>(
      MapTest.contract,
      this.contractId,
      "map1"
    ),
    map2: new RalphMap<HexString, bigint>(
      MapTest.contract,
      this.contractId,
      "map2"
    ),
  };

  async fetchState(): Promise<MapTestTypes.State> {
    return fetchContractState(MapTest, this);
  }

  view = {
    insert: async (
      params: MapTestTypes.CallMethodParams<"insert">
    ): Promise<MapTestTypes.CallMethodResult<"insert">> => {
      return callMethod(MapTest, this, "insert", params, getContractByCodeHash);
    },
    update: async (
      params: MapTestTypes.CallMethodParams<"update">
    ): Promise<MapTestTypes.CallMethodResult<"update">> => {
      return callMethod(MapTest, this, "update", params, getContractByCodeHash);
    },
    remove: async (
      params: MapTestTypes.CallMethodParams<"remove">
    ): Promise<MapTestTypes.CallMethodResult<"remove">> => {
      return callMethod(MapTest, this, "remove", params, getContractByCodeHash);
    },
    getValue: async (
      params: MapTestTypes.CallMethodParams<"getValue">
    ): Promise<MapTestTypes.CallMethodResult<"getValue">> => {
      return callMethod(
        MapTest,
        this,
        "getValue",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    insert: async (
      params: MapTestTypes.SignExecuteMethodParams<"insert">
    ): Promise<MapTestTypes.SignExecuteMethodResult<"insert">> => {
      return signExecuteMethod(MapTest, this, "insert", params);
    },
    update: async (
      params: MapTestTypes.SignExecuteMethodParams<"update">
    ): Promise<MapTestTypes.SignExecuteMethodResult<"update">> => {
      return signExecuteMethod(MapTest, this, "update", params);
    },
    remove: async (
      params: MapTestTypes.SignExecuteMethodParams<"remove">
    ): Promise<MapTestTypes.SignExecuteMethodResult<"remove">> => {
      return signExecuteMethod(MapTest, this, "remove", params);
    },
    getValue: async (
      params: MapTestTypes.SignExecuteMethodParams<"getValue">
    ): Promise<MapTestTypes.SignExecuteMethodResult<"getValue">> => {
      return signExecuteMethod(MapTest, this, "getValue", params);
    },
  };

  async multicall<Callss extends MapTestTypes.MultiCallParams[]>(
    ...callss: Callss
  ): Promise<
    Callss["length"] extends 1
      ? MapTestTypes.MultiCallResults<Callss[0]>
      : {
          [index in keyof Callss]: MapTestTypes.MultiCallResults<Callss[index]>;
        }
  > {
    return (await multicallMethods(
      MapTest,
      this,
      callss,
      getContractByCodeHash
    )) as Callss["length"] extends 1
      ? MapTestTypes.MultiCallResults<Callss[0]>
      : {
          [index in keyof Callss]: MapTestTypes.MultiCallResults<Callss[index]>;
        };
  }
}
