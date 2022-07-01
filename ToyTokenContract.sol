// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";

contract ToyToken is ERC20, Ownable, ERC20Snapshot{

  
    constructor() ERC20("TOY TOKEN", "TOY"){
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    function setSnapshot() public onlyOwner {
        _snapshot();
    } 

    function getCurrentSnapShotId() public onlyOwner view returns(uint256){
        return _getCurrentSnapshotId();
    }

    function mint(address beneficiary, uint256 amount) public onlyOwner {
        _mint(beneficiary, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Snapshot) {
        super._beforeTokenTransfer(from, to, amount);
    }
   

}