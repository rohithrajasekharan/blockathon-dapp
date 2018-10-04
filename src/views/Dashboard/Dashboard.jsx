import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import AccountBalance from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletRounded from "@material-ui/icons/AccountBalanceWalletRounded";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Token from 'build/contracts/Token.json';
import TokenSale from 'build/contracts/TokenSale.json';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        account: '0x0',
        value: 0,
        balance: 0,
        tokenPrice: 0.01,
        number: 0
      }
      var web3 = window.web3;

  if (typeof web3 !== 'undefined') {
      console.log("Using web3 detected from external source like Metamask");
      this.web3 = new Web3(web3.currentProvider);
  } else {
      console.log("Using localhost");
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  this.token = TruffleContract(Token)
  this.token.setProvider(web3.currentProvider)
  this.tokenSale = TruffleContract(TokenSale)
  this.tokenSale.setProvider(web3.currentProvider)
    this.buyTokens = this.buyTokens.bind(this)
  }
  componentDidMount(){
    this.web3.eth.getCoinbase((err,account) => {
      console.log(account);
      this.setState({account:account});
      this.token.deployed().then((tokenInstance)=>{
        this.tokenInstance = tokenInstance;
        return tokenInstance.balanceOf(this.state.account);
      }).then((balance)=>{
        this.setState({balance: balance.toNumber()})
      })
      this.tokenSale.deployed().then((tokenSaleInstance)=>{
        this.tokenSaleInstance = tokenSaleInstance;
        return tokenSaleInstance.tokenPrice();
      }).then((price)=>{
        this.setState({tokenPrice:price.toNumber()})
      })
    })
  }
  buyTokens(number) {
    console.log(number);
    console.log(this.state.account);
    console.log(this.state.tokenPrice);
    this.tokenSale.deployed().then((tokenSaleInstance=>{
    return tokenSaleInstance.buyTokens(number, {from: this.state.account, value: number * this.state.tokenPrice, gas: 500000 }).then((receipt)=>{
         console.log(this.state.balance);
       })
    }))

}
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon><AccountBalanceWalletRounded/></Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Wallet Balance</p>
                <h3 className={classes.cardTitle}>
                  {this.state.balance} <br/><small>COINS</small>
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="primary">
                  <AccountBalance />
                  <h3>1 Coin = 0.01 ether</h3>
                </CardIcon>
                <p className={classes.cardCategory}>Purchase Coins</p>
                  <CustomInput
                    labelText="Number of coins"
                    id="email-address"
                    onChange = {value=>{this.setState({number:value})}}
                    formControlProps={{
                      fullWidth: false
                    }}
                  /><br/>
                <Button color="primary" onClick={()=>{this.buyTokens(this.state.number)}}>Purchase</Button>
                  <br/>
                  <br/>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Coin Requests</h4>
                <p className={classes.cardCategoryWhite}>
                  Approve request for coins from the following accounts
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Email Id", "Amount", "Actions"]}
                  tableData={[
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
