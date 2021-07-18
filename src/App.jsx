import './App.css';
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Courses} />
              <Route path="/newCourse" component={CreateCourse} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
