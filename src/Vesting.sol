pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VestingContract {

    ERC20 toytoken;

    address public tokenContract;
    
    function setTokenContract(address _tokenContract) public returns(bool){
        tokenContract = _tokenContract;
        return true;
    }

    function balance() public returns(uint256){
        toytoken = ERC20(tokenContract);
        return toytoken.balanceOf(address(this));
    }

    function transfer(address account, uint256 amount) public returns(bool){
        toytoken.transfer(account,amount );
        return true;
    }
}