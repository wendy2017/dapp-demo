// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// contract RewardToken is ERC20 {
//     constructor(uint256 initialSupply) ERC20("RewardToken", "RWT") {
//         _mint(msg.sender, initialSupply*10**18);
//     }

// }
contract RewardToken is ERC20 {
  constructor() ERC20('RewardToken', 'RWT') {}

  function mint(uint256 amount) external {
    _mint(msg.sender, amount * 10 ** 18);
  }
}
