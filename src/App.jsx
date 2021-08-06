import './App.css';
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CourseForm from "./components/CourseForm/CourseForm";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import React from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import PrivateRouter from './components/PrivateRouter/PrivateRouter';

const App = () => {

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
              <PrivateRouter path="/courses/add" component={CourseForm}/>
              <PrivateRouter path="/courses/update/:id" component={CourseForm} />
              <Route path="/courses/:id" component={CourseInfo}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
}

export default App;
