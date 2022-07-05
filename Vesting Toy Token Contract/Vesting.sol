// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Vesting is Ownable {
    //address of ERC20 toy token
    IERC20 immutable private toy_token;

    //define duration
    // in this case -> 1 day
    uint256 private immutable duration;

    //initial claim of 10% is done or not.
    bool private initialClaim;
    uint256 public checkpoint;
    uint256 public VestingPeriod;

    /**
    * @dev Sets the toy_token Contract address
    * Vesting period - 90 days
    */

    constructor(address _token){
        require(_token != address(0), "please provide a valid address");
        toy_token = IERC20(_token);
        initialClaim = false;
        duration = 1 days;
        checkpoint = block.timestamp;
        VestingPeriod = checkpoint + 90 days;
    }

    /**
    * @dev function to claim the released tokens.
    * only owner can call this function, as mentioned in the requirements
    */
    function claimTokens() public onlyOwner returns(bool) {
        require(toy_token.balanceOf(address(this)) > 0, "no tokens left in the toy token contract");
        // how much percentage of tokens are released from the vesting period.
        uint256 unlockedPercentage = getTokensUnlockedPercentage();

        // amount of tokens released from the vesting period.
        uint256 tokensToBeClaimed =  (toy_token.totalSupply() * unlockedPercentage)/100;

        // transfer the released tokens to the owner's wallet
        toy_token.approve(_msgSender(),tokensToBeClaimed);
        toy_token.transfer(_msgSender(), tokensToBeClaimed);

        // if the function is called for the first time, set initial claim of 10% to be true.
        if(!initialClaim){
            initialClaim = true;
        }
        return true;

    }


    /**
    * @dev function to know how much percentage of tokens are unlocked from vesting period.
    */
    //
    function getTokensUnlockedPercentage () public returns (uint256) {
        uint256 allowedTokenPercent;

        if(!initialClaim){
            if(block.timestamp >= VestingPeriod) {
                allowedTokenPercent = 10 + (VestingPeriod - checkpoint) / duration;
                checkpoint = VestingPeriod;
            } else {
                allowedTokenPercent = 10 + (block.timestamp - checkpoint) / duration;
                checkpoint += (allowedTokenPercent - 10) * 1 days;
            }
            
        } else {
            if(block.timestamp >= VestingPeriod) {
                allowedTokenPercent = (VestingPeriod - checkpoint)/ duration;
                checkpoint = VestingPeriod;
            } else {
                allowedTokenPercent = (block.timestamp - checkpoint) / duration;
                checkpoint += (allowedTokenPercent) * 1 days;
            }
           
        }
        
        return allowedTokenPercent;

    }
}