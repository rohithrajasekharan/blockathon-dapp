import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "components/CustomButtons/Button.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import { createUser } from '../actions/index';
import { loginUser } from '../actions/index';
import { connect } from 'react-redux';


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loginemail: "",
      email: "",
      loginpassword: "",
      password: "",
      confirmpassword: "",
      error: "",
      showMyComponent: false
    };
  }
  handleNameChange = (value) => {
    this.setState({name: value})
  }
  handleEmailChange = (value) => {
    this.setState({email: value})
  }
  handleLoginEmailChange = (value) => {
    this.setState({loginemail: value})
  }
  handleLoginPasswordChange = (value) => {
    this.setState({loginpassword: value})
  }
  handlePasswordChange = (value) => {
    this.setState({password: value})
  }
  handlePasswordagainChange = (value) => {
    this.setState({confirmpassword: value})
  }
  handleLoginSubmit = () => {
    this.setState({showMyComponent: true})
    const data = {
      email: this.state.loginemail,
      password: this.state.loginpassword
    }
this.props.loginUser(data).then((data) => {
  console.log(data);
  if(!data)
  { this.setState({error: "Invalid Email or Password",showMyComponent: false}) }
  else{window.location.href = '/dashboard'; } })
  }
  handleSignupSubmit = () => {
    this.setState({showMyComponent: true})
    const data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    }//submit state to action creator and take to home page
this.props.createUser(data).then((data) => { if(!data){ this.setState({error: "Email already exists",showMyComponent: false}) }
else{window.location.href = '/dashboard';} })

  }
  render () {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} style={{marginRight:'auto',marginLeft:'auto',marginTop:82}}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Login",
                tabContent: (
                  <div><br/><br/>

                  <GridContainer>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                         onChange={value => this.handleLoginEmailChange(value)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Password"
                        id="first-name"
                         onChange={value => this.handleLoginPasswordChange(value)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <br/>
                    {this.state.showMyComponent?<GridItem xs={12} sm={12} md={4}>
                    <CircularProgress/></GridItem>:null}
                  <GridContainer>

                    <GridItem xs={12} sm={12} md={4}>
                      <Button color="primary" onClick={()=>{this.handleLoginSubmit();}}>Login</Button>
                    </GridItem>
                  </GridContainer>
                  <br/>

                  </div>
                )
              },
              {
                tabName: "Sign Up",
                tabContent: (
                  <div><br/><br/>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Name"
                        id="username"
                         onChange={value => this.handleNameChange(value)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                         onChange={value => this.handleEmailChange(value)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Password"
                        id="first-name"
                         onChange={value => this.handlePasswordChange(value)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Confirm Password"
                        id="first-name"
                         onChange={value => this.handlePasswordagainChange(value)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <br/><br/>
                    {this.state.showMyComponent?<GridItem xs={12} sm={12} md={4}>
                    <CircularProgress/></GridItem>:null}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button color="primary" onClick={()=>{this.handleSignupSubmit();}}>sign up</Button></GridItem>
      </GridContainer>
                  <br/>

                  </div>
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user.data }
}
const Login = withStyles(styles)(LoginComponent);
export default connect(mapStateToProps, { loginUser,createUser })(Login);
