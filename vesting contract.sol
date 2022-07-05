//SPDX-License-Identifier:GPL-3.0
pragma solidity ^0.8;
contract Vesting{
    struct Founder{
        uint256 amount;
        uint256 maturity;
        bool paid;
    }
    mapping(address=>Founder)public founders;
    address public admin;
    constructor(){
        admin=msg.sender;

    }
    function addFounder(address _founder,uint256 _timetomaturity) external payable{
        //if(x!=y){
            //console.log(error)
            //return 
            //}
            require (msg.sender==admin,'only admin allowed');
            //same founder (address) cannot be added twice
            require(founders[_founder].amount==0,'founder already exists');
            founders[_founder]=Founder(msg.value,block.timestamp+_timetomaturity,false);
        }
    function withdraw() external returns(bool){
        Founder storage founder=founders[msg.sender];
        require(founder.maturity<=block.timestamp,'too early');
        require(founder.amount>0);
        require(founder.paid==false,'paid already');
        founder.paid=true;
        payable(msg.sender).transfer(founder.amount);
        return true;
    }
    }
