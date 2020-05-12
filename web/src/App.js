import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ForumNavbar from './components/Navbars/Navbar';
import ForumFooter from "./components/Footers/ForumFooter";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        name: 'Ada Lovelace',
        user: 'ada',
        photo: require("./assets/img/profile/ada-lovelace.jpg")
      }
    }
  }

  render() {
    return (
      <Router>
        <ForumNavbar user={this.state.user} />
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Home {...props} />} />
          <Route
            path="/posts/:id/:slug"
            render={props => <Post {...props} />}
          />
          <Redirect to="/" />
        </Switch>
        <ForumFooter />
      </Router>
    );
  }
}

export default App;
