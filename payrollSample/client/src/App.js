import './App.css';
import{BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from './pages/Home';
import Payroll from './pages/payroll';
import Timesheet from './pages/timesheet';
import Job from './pages/job';
import Employee from './pages/employee';
import Department from './pages/department';
import EmpJob from './pages/empjob';
//import React, { useState } from 'react';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <header className="App-header">
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/timesheet" >
              <Timesheet />
            </Route>
            <Route path="/payroll" >
              <Payroll />
            </Route>
          
            <Route path="/job" >
              <Job />
            </Route>





            <Route path="/empjob" >
              <EmpJob />
            </Route>
            <Route path="/employee" >
              <Employee />
            </Route>
            <Route path="/department" >
              <Department />
            </Route>

          </header>
        </Router>
      </header>
    </div>
  );
}
export default App;
// */
