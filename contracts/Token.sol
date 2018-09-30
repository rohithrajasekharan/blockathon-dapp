pragma solidity ^0.4.2;

contract Token {
  string public name = "Token";
  string public symbol = "COIN";
  string public standard = "GLOBAL COIN V1.0";
  uint256 public totalSupply;
  mapping (address => uint256) public balanceOf;
  constructor (uint256 _initialSupply) public  {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;

  }
}
