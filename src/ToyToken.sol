// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
contract TOYTOKEN is ERC20, Ownable, ERC20Snapshot{
    address public vestingContract;
    
    constructor(address _vestingContract) ERC20("TOY TOKEN", "TOY"){
        vestingContract = _vestingContract;
        _mint(vestingContract, 100000e18); // hundred thousand TOY tokens
    }


    function takeSnapshot() public onlyOwner returns(uint256){
        return _snapshot();
    }

    function getCurrentSnapShot() public view returns(uint256){
        return _getCurrentSnapshotId();
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Snapshot) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
