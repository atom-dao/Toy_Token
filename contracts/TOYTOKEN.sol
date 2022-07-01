// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

//Required imports from open zeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // for ERC20 functionality
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol"; // for snapshot functionality
import "@openzeppelin/contracts/access/Ownable.sol"; //so that only contract deployer can call the functions

contract TOYTOKEN is ERC20, ERC20Snapshot, Ownable {
    //mint 100000 tokens to the deployer of the contract
    constructor() ERC20("TOY TOKEN", "TOY") {
        _mint(msg.sender, 100000 * 10**decimals());
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Snapshot) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
