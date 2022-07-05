import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SurveyNew from './surveys/SurveyNew';


import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/signup" component={Signup} />
          </div>
        </BrowserRouter>
    );
  }
};

export default connect(null, actions)(App);
