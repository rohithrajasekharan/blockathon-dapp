import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import { logoutUser } from 'actions/index';
import { connect } from 'react-redux';

class HeaderLinksComponent extends React.Component {

  handleLogout = () => {
    this.props.logoutUser();
    window.location.href = '/';
  }
  render() {
    return (
      <div>
          <Button color="danger" onClick={()=>{this.props.logoutUser().then(()=>{window.location.href="/"})}}>LOG OUT</Button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user.data }
}
const HeaderLinks = withStyles(headerLinksStyle)(HeaderLinksComponent);
export default connect(mapStateToProps, { logoutUser })(HeaderLinks);
