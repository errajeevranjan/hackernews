import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/Search";
import Login from "./components/Login";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/search' component={Search} />
      </Router>
    );
  }
}
export default App;
