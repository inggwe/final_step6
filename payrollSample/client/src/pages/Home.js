import React from 'react';
import "../App.css";


var welcome;  
    var date = new Date();  
    var hour = date.getHours();  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    if (minute < 10) {  
      minute = "0" + minute;  
    }  
    if (second < 10) {  
      second = "0" + second;  
    }  
    if (hour < 12) {  
      welcome = "Good morning,";  
    } else if (hour < 17) {  
      welcome = "Good afternoon,";  
    } else {  
      welcome = "Good evening,";  
    }  



function HomePage() {
  var welcome;  
    var date = new Date();  
    var hour = date.getHours();  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    if (minute < 10) {  
      minute = "0" + minute;  
    }  
    if (second < 10) {  
      second = "0" + second;  
    }  
    if (hour < 12) {  
      welcome = "Good morning";  
    } else if (hour < 17) {  
      welcome = "Good afternoon";  
    } else {  
      welcome = "Good evening";  
    }  
    //document.getElementById("welcome").innerHTML = welcome;
    
  return (
    <>
      <h1 value={welcome}>Dear manager, <span id="welcome">{welcome}</span> </h1>

        <div className="menu-box">
            <h2>MENU</h2>

            <p> Manage a Table:
            <li><a className="App-link" href='/timesheet'> Timesheets</a></li>
            <li><a className="App-link" href='/employee'> MyEmployees </a></li>
            <li><a className="App-link" href='/department'> Departments</a></li>
            <li><a className="App-link" href='/job'> Jobs</a></li>
            <li><a className="App-link" href='/empJob'>Employees_Jobs</a></li>
            </p>

            <p>Search Info:
            <li><a className="App-link" href='/payroll'> Employee Monthly Payroll Information</a></li>
            </p>
        </div>


    </>
  );
}

export default HomePage;
