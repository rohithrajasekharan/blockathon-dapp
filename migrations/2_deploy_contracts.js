var Token = artifacts.require("./Token.sol");
var TokenSale = artifacts.require("./TokenSale.sol");
var tokenPrice = 1000000000000000; //wei i.e .001 eth

module.exports = function(deployer) {
  deployer.deploy(Token, 1000000).then(function(){
    return deployer.deploy(TokenSale, Token.address, tokenPrice);
  })
};
