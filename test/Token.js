var Token = artifacts.require("./Token.sol");

contract('Token', function(accounts){
  var tokenInstance;

  it('initial values are correct', function(){
  return Token.deployed().then(function(instance){
    tokenInstance = instance;
    return tokenInstance.name();
  }).then(function(name) {
    assert.equal(name, 'Token','has the correct name');
    return tokenInstance.symbol();
  }).then(function(symbol) {
    assert.equal(symbol, 'COIN','has the correct symbol');
    return tokenInstance.standard();
  }).then(function(standard) {
    assert.equal(standard, 'GLOBAL COIN V1.0','has the correct standard');
  })
    })

  it('allocates initial supply on deployment', function(){
  return Token.deployed().then(function(instance){
    tokenInstance = instance;
    return tokenInstance.totalSupply();
  }).then(function(totalSupply){
    assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply equal to 1000000');
    return tokenInstance.balanceOf(accounts[0])
  }).then(function(adminBalance) {
    assert.equal(adminBalance.toNumber(), 1000000, 'allocates the initial supply to the admin ')
  })
    })
})
