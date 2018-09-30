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

    it('transfers tokens', function(){
      return Token.deployed().then(function(instance){
        tokenInstance = instance;
        return tokenInstance.transfer.call(accounts[1], 9999999999999999);
      }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
        return tokenInstance.transfer.call(accounts[1],250000, {from: accounts[0]})
      }).then(function(success){
        assert.equal(success, true, 'transfer returns true');
        return tokenInstance.transfer(accounts[1],250000, {from: accounts[0]})
      }).then(function(receipt){
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Transfer', 'the event is "Transfer" event');
        assert.equal(receipt.logs[0].args._from, accounts[0], 'the account that sends token');
        assert.equal(receipt.logs[0].args._to, accounts[1], 'the account that receives the token');
        assert.equal(receipt.logs[0].args._value, 250000, 'the transfer amount');
        return tokenInstance.balanceOf(accounts[1]);
      }).then(function(balance){
        assert.equal(balance.toNumber(),250000,'amount is added to the transferred account');
        return tokenInstance.balanceOf(accounts[0]);
      }).then(function(balance){
        assert.equal(balance.toNumber(),750000,'amount is deducted from the withdrawn account')
      })
    })
})
