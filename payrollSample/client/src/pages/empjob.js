//import logo from './logo.svg';
import "../App.css";
import{useState} from "react";
import Axios from 'axios';
import React from 'react';

function EmpJob() {
  const[timesheetID, setTimesheetID] = useState("");
  const[employeeID, setEmployeeID] = useState("");
  const[clockDate, setClockDate] = useState("");
  const[clockIn, setClockIn] = useState("");
  const[clockOut, setClockOut] = useState("");

  const[newEmployeeID, setNewEmployeeID] = useState("");
  const[newClockDate, setNewClockDate] = useState("");
  const[newClockIn, setNewClockIn] = useState("");
  const[newClockOut, setNewClockOut] = useState("");

  const [timesheetList, setTimesheetList] = useState([]);

  const addTimesheet = () => {
    //console.log(Time_Sheet_ID); //test whether it grabs the ID from mysql server
    Axios.post("flip1.oregonstate.engr:20500/timesheet", { 
        Time_Sheet_ID: timesheetID,
        Employee_ID: employeeID, 
        Clock_Date: clockDate, 
        Clock_In: clockIn, 
        Clock_Out: clockOut,
           //client: server
          }).then(() => {
          //console.log("SUCCESS!");
            //use radius structuring
         setTimesheetList([...timesheetList, {
          Time_Sheet_ID: timesheetID,
           Employee_ID: employeeID, 
            Clock_Date: clockDate, 
           Clock_In: clockIn, 
           Clock_Out: clockOut,
           }]);

           })                                                           
     };
 
  const getTimesheet = () => {
    //console.log(timesheetID); //test whether it grabs the name from mysql server
    Axios.get("flip1.oregonstate.engr:20500/timesheet").then((response) => {
      console.log(response);
      setTimesheetList(response.data);
      });                                                           
  };

  const updateTimesheet = (Time_Sheet_ID) => {
    Axios.put("flip1.oregonstate.engr:20500/UpdateTimesheet", {
        Employee_ID:newEmployeeID, 
        Clock_In:newClockIn, 
        Clock_Out:newClockOut, 
        Clock_Date:newClockDate, 
        Time_Sheet_ID:Time_Sheet_ID }).then(

     (response) => {
        setTimesheetList(
          timesheetList.map((val) => {
            return val.Time_Sheet_ID == Time_Sheet_ID
              ? {
                Time_Sheet_ID: val.Time_Sheet_ID,
                  Employee_ID:newEmployeeID, 
                  Clock_In:newClockIn, 
                  Clock_Out:newClockOut, 
                  Clock_Date:newClockDate,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteTimesheet = (Time_Sheet_ID) => {
    Axios.delete(`flip1.oregonstate.engr:20500/DeleteTimesheet/${Time_Sheet_ID}`).then((response) => {
      setTimesheetList(
        timesheetList.filter((val) => {
          return val.Time_Sheet_ID != Time_Sheet_ID;
        })
      );
    });
  };
  

  //const displayInfo = () =>{console.log(timesheetID+employeeID+clockDate+clockIn+clockOut)}

  return (
    <div className="App">

        <nav class="crumbs">
            <ol>
                <li class="crumb"><a href="/">HomePage </a></li>
                <li class="crumb">Manage Timesheets</li>
            </ol>
        </nav>

      <div className="information">
        <lable>Timesheet ID </lable>
        <input type="text" onChange={(event) => {setTimesheetID(event.target.value)}}/>
        <lable>Employee ID </lable>
        <input type="text" onChange={(event) => {setEmployeeID(event.target.value)}}/>
        <lable>Clock Date </lable>
        <input type="date" onChange={(event) => {setClockDate(event.target.value)}}/>
        <lable>Clock In</lable>
        <input type="time" onChange={(event) => {setClockIn(event.target.value)}}/>
        <lable>Clock Out</lable>
        <input type="time" onChange={(event) => {setClockOut(event.target.value)}}/>
        <button onClick={addTimesheet}>Add a record</button>
        <div>-----------------------------------------------------------------------------------------------------------------------------------------------------</div>
        <button onClick={getTimesheet}>Display all records </button>
        {timesheetList.map((val,key)=>{ return(
          <div className="timesheet">
            <div> 
              <h3>Timesheet ID: {val.Time_Sheet_ID}</h3>
              <h3>Employee ID: {val.Employee_ID}</h3>
              <h3>Clock Date: {val.Clock_Date}</h3>
              <h3>ClockIn: {val.Clock_In}</h3>
              <h3>Clock On: {val.Clock_Out}</h3>

            <div align="center"><button onClick={() => {deleteTimesheet(val.Time_Sheet_ID); }} > Delete </button></div>

            </div>
            <div className="updateBox"> <h2 align="center">Edit this record  </h2>   
                      <div><lable> Employee ID </lable>
                      <input type="text" placeholder="Enter an existing Employee_ID" onChange={(event) => {setNewEmployeeID(event.target.value)}}/></div>
                      <div><lable>Clock Date </lable>
                      <input type="date" onChange={(event) => {setNewClockDate(event.target.value)}}/></div>
                      <div><lable>Clock In</lable>
                      <input type="time" onChange={(event) => {setNewClockIn(event.target.value)}}/></div>
                      <div><lable>Clock Out </lable>
                      <input type="time" onChange={(event) => {setNewClockOut(event.target.value)}}/></div>
                      <div align="center"><button className="updateB" onClick={()=>{updateTimesheet(val.Time_Sheet_ID);}}> {" "} Update </button></div>
            </div>   
          </div>

         )
      })}
      <div>---------------------------------------------------------------------------------------------------------------------------------------------</div>
    </div>
  </div>
);
}

export default EmpJob;

