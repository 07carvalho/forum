import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ForumNavbar from './components/Navbars/Navbar';
// import { Router } from 'react-router';
import Home from "./views/Home.js";
// import Index from "./views/Index.js";
import Landing from "./views/examples/Landing.js";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  render() {
    return (
      <Router>
        <ForumNavbar />
        <Switch>
          <Route path="/" exact render={props => <Home {...props} />} />
          <Route
            path="/landing-page"
            exact
            render={props => <Landing {...props} />}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
