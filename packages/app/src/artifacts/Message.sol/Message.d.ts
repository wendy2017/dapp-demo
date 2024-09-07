// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface Message$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "Message",
  "sourceName": "contracts/Message.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "purpose",
          "type": "string"
        }
      ],
      "name": "SetMessage",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040526040518060400160405280601781526020017f517569636b6c79207368697020576562332041707073210000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610166565b82805461006e90610105565b90600052602060002090601f01602090048101928261009057600085556100d7565b82601f106100a957805160ff19168380011785556100d7565b828001600101855582156100d7579182015b828111156100d65782518255916020019190600101906100bb565b5b5090506100e491906100e8565b5090565b5b808211156101015760008160009055506001016100e9565b5090565b6000600282049050600182168061011d57607f821691505b6020821081141561013157610130610137565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61054e806101756000396000f3fe6080604052600436106100295760003560e01c8063368b87721461002e578063e21f37ce1461004a575b600080fd5b61004860048036038101906100439190610269565b610075565b005b34801561005657600080fd5b5061005f6100c8565b60405161006c919061032a565b60405180910390f35b806000908051906020019061008b929190610156565b507f3c55514de50d14506d6b7e1d1e94ee2f674c70c69370e5fe71a0d9de7c88385433826040516100bd9291906102fa565b60405180910390a150565b600080546100d590610432565b80601f016020809104026020016040519081016040528092919081815260200182805461010190610432565b801561014e5780601f106101235761010080835404028352916020019161014e565b820191906000526020600020905b81548152906001019060200180831161013157829003601f168201915b505050505081565b82805461016290610432565b90600052602060002090601f01602090048101928261018457600085556101cb565b82601f1061019d57805160ff19168380011785556101cb565b828001600101855582156101cb579182015b828111156101ca5782518255916020019190600101906101af565b5b5090506101d891906101dc565b5090565b5b808211156101f55760008160009055506001016101dd565b5090565b600061020c61020784610371565b61034c565b905082815260208101848484011115610228576102276104f8565b5b6102338482856103f0565b509392505050565b600082601f8301126102505761024f6104f3565b5b81356102608482602086016101f9565b91505092915050565b60006020828403121561027f5761027e610502565b5b600082013567ffffffffffffffff81111561029d5761029c6104fd565b5b6102a98482850161023b565b91505092915050565b6102bb816103be565b82525050565b60006102cc826103a2565b6102d681856103ad565b93506102e68185602086016103ff565b6102ef81610507565b840191505092915050565b600060408201905061030f60008301856102b2565b818103602083015261032181846102c1565b90509392505050565b6000602082019050818103600083015261034481846102c1565b905092915050565b6000610356610367565b90506103628282610464565b919050565b6000604051905090565b600067ffffffffffffffff82111561038c5761038b6104c4565b5b61039582610507565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60006103c9826103d0565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b82818337600083830152505050565b60005b8381101561041d578082015181840152602081019050610402565b8381111561042c576000848401525b50505050565b6000600282049050600182168061044a57607f821691505b6020821081141561045e5761045d610495565b5b50919050565b61046d82610507565b810181811067ffffffffffffffff8211171561048c5761048b6104c4565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f830116905091905056fea26469706673582212207358ead2699a8a0063950c06cc11fafecfd405f4882b4cd59a6544091f152bf264736f6c63430008070033",
  "deployedBytecode": "0x6080604052600436106100295760003560e01c8063368b87721461002e578063e21f37ce1461004a575b600080fd5b61004860048036038101906100439190610269565b610075565b005b34801561005657600080fd5b5061005f6100c8565b60405161006c919061032a565b60405180910390f35b806000908051906020019061008b929190610156565b507f3c55514de50d14506d6b7e1d1e94ee2f674c70c69370e5fe71a0d9de7c88385433826040516100bd9291906102fa565b60405180910390a150565b600080546100d590610432565b80601f016020809104026020016040519081016040528092919081815260200182805461010190610432565b801561014e5780601f106101235761010080835404028352916020019161014e565b820191906000526020600020905b81548152906001019060200180831161013157829003601f168201915b505050505081565b82805461016290610432565b90600052602060002090601f01602090048101928261018457600085556101cb565b82601f1061019d57805160ff19168380011785556101cb565b828001600101855582156101cb579182015b828111156101ca5782518255916020019190600101906101af565b5b5090506101d891906101dc565b5090565b5b808211156101f55760008160009055506001016101dd565b5090565b600061020c61020784610371565b61034c565b905082815260208101848484011115610228576102276104f8565b5b6102338482856103f0565b509392505050565b600082601f8301126102505761024f6104f3565b5b81356102608482602086016101f9565b91505092915050565b60006020828403121561027f5761027e610502565b5b600082013567ffffffffffffffff81111561029d5761029c6104fd565b5b6102a98482850161023b565b91505092915050565b6102bb816103be565b82525050565b60006102cc826103a2565b6102d681856103ad565b93506102e68185602086016103ff565b6102ef81610507565b840191505092915050565b600060408201905061030f60008301856102b2565b818103602083015261032181846102c1565b90509392505050565b6000602082019050818103600083015261034481846102c1565b905092915050565b6000610356610367565b90506103628282610464565b919050565b6000604051905090565b600067ffffffffffffffff82111561038c5761038b6104c4565b5b61039582610507565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60006103c9826103d0565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b82818337600083830152505050565b60005b8381101561041d578082015181840152602081019050610402565b8381111561042c576000848401525b50505050565b6000600282049050600182168061044a57607f821691505b6020821081141561045e5761045d610495565b5b50919050565b61046d82610507565b810181811067ffffffffffffffff8211171561048c5761048b6104c4565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f830116905091905056fea26469706673582212207358ead2699a8a0063950c06cc11fafecfd405f4882b4cd59a6544091f152bf264736f6c63430008070033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "Message",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Message$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/Message.sol:Message",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Message$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "Message",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Message$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/Message.sol:Message",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Message$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "Message",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Message$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/Message.sol:Message",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Message$Type["abi"]>>;
}
