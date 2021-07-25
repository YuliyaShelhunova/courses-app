import './App.css';
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import React from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import CourseInfo from "./components/CourseInfo/CourseInfo";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/registration" component={Registration} />
              <Redirect exact from="/" to="/courses" />
              <Route exact path="/courses" component={Courses} />
              <Route path="/courses/add" component={CreateCourse} />
              <Route path="/courses/:id" component={CourseInfo} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
