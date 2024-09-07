// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { NFTStakingVault$Type } from "./NFTStakingVault";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["NFTStakingVault"]: NFTStakingVault$Type;
    ["contracts/nft-stake/NFTStakingVault.sol:NFTStakingVault"]: NFTStakingVault$Type;
  }

  interface ContractTypesMap {
    ["NFTStakingVault"]: GetContractReturnType<NFTStakingVault$Type["abi"]>;
    ["contracts/nft-stake/NFTStakingVault.sol:NFTStakingVault"]: GetContractReturnType<NFTStakingVault$Type["abi"]>;
  }
}
