// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/ToyToken.sol";
import "../src/Vesting.sol";

contract ToyTokenTest is Test {

     VestingContract vv;

      TOYTOKEN tt;
    function setUp() public {
        vv = new VestingContract();
        tt = new TOYTOKEN(address(vv));
    }

    function testcheckTotalSupply() public{
      uint totalSupply = tt.totalSupply();
      assertEq(100000e18, totalSupply);
    }

    function testOnlyOwnerCanTakeSnapShotTransfer() public{
        vm.prank(tt.owner());
       uint id = tt.takeSnapshot();
       assertEq(tt.getCurrentSnapShot(), id);
    }

    function testRevertIfNotOwner() public{
        vm.prank(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        vm.expectRevert("Ownable: caller is not the owner");
        tt.takeSnapshot();
    }
   
}
