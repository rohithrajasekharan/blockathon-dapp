import React from "react";
import ReactDOM from "react-dom";
import rootReducer from './reducers';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/css/material-dashboard-react.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import indexRoutes from "routes/index.jsx";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
