var Token = artifacts.require("./Token.sol");

contract('Token', function(accounts){
  it('sets the total supply on deployment', function(){
  return Token.deployed().then(function(instance){
    tokenInstance = instance;
    return tokenInstance.totalSupply();
  }).then(function(totalSupply){
    assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply equal to 1000000');
  })
    })
})
