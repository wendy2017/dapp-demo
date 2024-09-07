// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract NFT is ERC721, Ownable {
  uint256 private _tokenIdCounter;

  constructor() ERC721('NexthFT', 'NFT') Ownable() {}

  function safeMint(address to) public onlyOwner {
    uint256 tokenId = _tokenIdCounter;
    _tokenIdCounter += 1;
    _safeMint(to, tokenId);
  }
}
