import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/user/login';
import AppLayout from './components/layout/AppLayout'
import {AuthProvider} from "./context/AuthContext";

class App extends Component {
  constructor(props) {
    super();
    this.state = {}
  }
  render() {
    return (
        <Router>
          <AuthProvider>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <AppLayout />
            </Route>
          </Switch>
          </AuthProvider>
        </Router>
    );
  }
}

export default App;