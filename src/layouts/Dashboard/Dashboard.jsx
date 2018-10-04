/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Login from "views/login.jsx";
import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { fetchUser } from 'actions/index';
import image from "assets/img/sidebar-5.jpg";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      user: ""
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  componentWillMount(){
    this.props.fetchUser().then((data) => {
      this.setState({user: data.payload.data})
       })
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
      {this.state.user==""? <div><Login/></div>: <div className={classes.wrapper}>
          <Sidebar
            routes={dashboardRoutes}
            logoText={"Coin Chat"}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={dashboardRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
          </div>
        </div>}
</div>
    );
  }
}

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return { user: state.user.data }
}
const App = withStyles(dashboardStyle)(AppComponent);
export default connect(mapStateToProps, { fetchUser })(App);
