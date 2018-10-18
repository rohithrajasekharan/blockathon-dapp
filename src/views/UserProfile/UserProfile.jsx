import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Token from 'build/contracts/Token.json';
import TokenSale from 'build/contracts/TokenSale.json';
import avatar from "assets/img/faces/mark.jpg";
import avatar1 from "assets/img/faces/twain.jpg";
import { connect } from 'react-redux';
import { fetchUser } from 'actions/index';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfileComponent extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        user: null,
        email: "",
        number: 0,
        account: '0x0',
        value: 0,
        balance: 0
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
  this.transferTokens = this.transferTokens.bind(this)
  }
  componentWillMount(){
    this.props.fetchUser().then(data=>{
      this.setState({user:data.payload.data})
    })
  }
  componentDidMount(){
    this.setState({user: this.props.user})
    this.web3.eth.getCoinbase((err,account) => {
      console.log(account);
      this.setState({account:account});
      this.token.deployed().then((tokenInstance)=>{
        this.tokenInstance = tokenInstance;
        return tokenInstance.balanceOf(this.state.account);
      }).then((balance)=>{
        this.setState({balance: balance.toNumber()})
      })
    })
  }
  transferTokens(number) {
    this.token.deployed().then((tokenInstance=>{
       return tokenInstance.transfer('0xCc1cfC4866B1dA316286836E7016CDe298079F65', number,  {from: this.state.account, value: number * this.state.tokenPrice, gas: 500000 }).then((receipt)=>{
         console.log(this.state.balance);
       })
    }))

}
  render () {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Coin Transaction</h4>
                <p className={classes.cardCategoryWhite}>Send or request coins</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      onChange={(value)=>{this.setState({email:value})}}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Number of coins"
                      id="email-address"
                      onChange={(value)=>{this.setState({amount:value})}}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer>
  </GridContainer>

              </CardBody>
              <CardFooter>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
              <Button color="primary" onClick={()=>{this.transferTokens(this.state.amount)}}>Send Coins</Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
              <Button color="primary">Request Coins</Button>
              </GridItem>
              </GridContainer>

              </CardFooter>
            </Card>
          </GridItem>
        <GridItem xs={12} sm={12} md={4}>
              {this.state.user? <Card profile>
                <CardAvatar profile>
                  {this.state.user.avatar?<a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar1} alt="..." />
                  </a>:<a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>}

                </CardAvatar>
                <CardBody profile>
                    <div>  <h6 className={classes.cardCategory}>{this.state.user.name}</h6>
                  <h4 className={classes.cardTitle}>{this.state.user.email}</h4>
                  </div>
                  </CardBody>
              </Card>:<div></div>}
            </GridItem>

        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.data }
}
const UserProfile = withStyles(styles)(UserProfileComponent);
export default connect(mapStateToProps, { fetchUser })(UserProfile);
