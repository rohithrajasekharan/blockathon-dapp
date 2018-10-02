var Token = artifacts.require("./Token.sol");
var TokenSale = artifacts.require("./TokenSale.sol");

contract('TokenSale', function(accounts){
  var tokenSaleInstance;
  var tokenInstance;
  var admin = accounts[0];
  var buyer = accounts[1];
  var tokenPrice = 1000000000000000; //wei
  var tokensAvailable = 7500000;
  var numberOfTokens;
  it('initialize contract with correct values', function(){
    return TokenSale.deployed().then(function(instance){
      tokenSaleInstance = instance;
      return tokenSaleInstance.address;
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has contract address');
      return tokenSaleInstance.tokenContract();
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has token contract address');
      return tokenSaleInstance.tokenPrice();
    }).then(function(price){
      assert.equal(price, tokenPrice, 'token price is correct');
    })
  })

  it('facilitates token buying', function(){
    return Token.deployed().then(function(instance){
      tokenInstance = instance;
      return TokenSale.deployed();
    }).then(function(instance){
      tokenSaleInstance = instance;
      //give 75% to sale
      return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin})
    }).then(function(receipt) {
      numberOfTokens = 10;
      return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: numberOfTokens * tokenPrice})
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Sell', 'the event is "Sell" event');
      assert.equal(receipt.logs[0].args._buyer, buyer, 'the account that purchased token');
      assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'the number of tokens purchased');
      return tokenSaleInstance.tokensSold();
    }).then(function(amount){
      assert.equal(amount.toNumber(), numberOfTokens, 'adds the number of tokens sold');
      return tokenInstance.balanceOf(buyer);
    }).then(function(balance){
      assert.equal(balance.toNumber(), numberOfTokens);
      return tokenInstance.balanceOf(tokenSaleInstance.address);
    }).then(function(balance){
      assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
      return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: 1})
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
      return tokenSaleInstance.buyTokens(800000, {from: buyer, value: numberOfTokens * tokenPrice})
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
    })
  })

  it('ends token sale', function() {
  return Token.deployed().then(function(instance) {
    tokenInstance = instance;
    return TokenSale.deployed();
  }).then(function(instance) {
    tokenSaleInstance = instance;
    return tokenSaleInstance.endSale({ from: buyer });
  }).then(assert.fail).catch(function(error) {
    assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
    return tokenSaleInstance.endSale({ from: admin });
  }).then(function(receipt) {
    return tokenInstance.balanceOf(admin);
  }).then(function(balance) {
    assert.equal(balance.toNumber(), 1000000, 'returns all unsold dapp tokens to admin');
  });
});
})
