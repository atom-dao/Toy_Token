// Toy Token Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";

contract ToyToken is ERC20, Ownable, ERC20Snapshot {
    constructor() ERC20("TOY TOKEN", "TOY") {
        //initially all the tokens would be transferred to the owner of the smart contract.
        //use transfer method to transfer the minted tokens to a new address
        //if you want to transfer n tokens, write n*(10**18) as the amount.
        _mint(msg.sender, 100000*(10**18));
    }

    //function to take snapshot of the blockchain
    //this action can only be done by the owner
    function snapshot() public onlyOwner {
        _snapshot();
    }

    //function to get snapshotId so that we can check the total supply at snapshot.
    //use totalSupplyAt method to check the balance at the time of the particular snapshot.
    //Only owner can run this function
    function getCurrentSnapShot() public view onlyOwner returns(uint256) {
        return _getCurrentSnapshotId();
    }

    //this function is used for snapshot purposes.
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}