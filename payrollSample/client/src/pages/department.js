//import logo from './logo.svg';
import "../App.css";
import{useState} from "react";
import Axios from 'axios';
import React from 'react';

function Dpartment() {
  const[departmentID, setDepartmentID] = useState("");
  const[departmentName, setDepartmentName] = useState("");
  const[departmentHeadID, setDepartmentHeadID] = useState("");
  const[departmentEmail,setDepartmentEmail] = useState("");
  const[departmentSupervisor, setDepartmentSupervisor] = useState("");

  const[newDepartmentName, setNewDepartmentName] = useState("");
  const[newDepartmentHeadID, setNewDepartmentHeadID] = useState("");
  const[newDepartmentEmail,setNewDepartmentEmail] = useState("");
  const[newDepartmentSupervisor, setNewDepartmentSupervisor] = useState("");

  const [departmentList, setDepartmentList] = useState([]);

  const addDepartment = () => {
    //console.log(Time_Sheet_ID); //test whether it grabs the ID from mysql server
    Axios.post("flip1.oregonstate.engr:20500/department", { 
        Department_ID: departmentID,
        Department_Name: departmentName, 
        Department_Head_ID: departmentHeadID, 
        Department_Email: departmentEmail, 
        Department_Supervisor: departmentSupervisor
           //client: server
          }).then(() => {
          //console.log("SUCCESS!");
            //use radius structuring
            setDepartmentList([...departmentList, {
            Department_ID: departmentID,
            Department_Name: departmentName, 
            Department_Head_ID: departmentHeadID, 
            Department_Email: departmentEmail, 
            Department_Supervisor: departmentSupervisor
           }]);

           })                                                           
     };
 
  const getDepartment = () => {
    //console.log(timesheetID); //test whether it grabs the name from mysql server
    Axios.get("flip1.oregonstate.engr:20500/department").then((response) => {
      console.log(response);
      setDepartmentList(response.data);
      });                                                           
  };

  const updateDepartment = (Department_ID) => {
    Axios.put("flip1.oregonstate.engr:20500/UpdateDepartment", {
            Department_Name: newDepartmentName, 
            Department_Head_ID: newDepartmentHeadID, 
            Department_Email: newDepartmentEmail, 
            Department_Supervisor: newDepartmentSupervisor, 
            Department_ID: Department_ID }).then(

     (response) => {
        setDepartmentList(
            departmentList.map((val) => {
            return val.Department_ID == Department_ID
              ? {
                Department_ID: val.Department_ID,
                Department_Name: newDepartmentName, 
                Department_Head_ID: newDepartmentHeadID, 
                Department_Email: newDepartmentEmail, 
                Department_Supervisor: newDepartmentSupervisor 
                }
              : val;
          })
        );
      }
    );
  };

  const deleteDepartment = (Department_ID) => {
    Axios.delete(`flip1.oregonstate.engr:20500/DeleteDepartment/${Department_ID}`).then((response) => {
        setDepartmentList(
        departmentList.filter((val) => {
          return val.Department_ID != Department_ID;
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
                <li class="crumb">Manage Departments</li>
            </ol>
        </nav>

      <div className="information">
        <lable>Department ID </lable>
        <input type="text" onChange={(event) => {setDepartmentID(event.target.value)}}/>
        <lable>Department </lable>
        <input type="text" onChange={(event) => {setDepartmentName(event.target.value)}}/>
        <lable>Department Head ID </lable>
        <input type="text" onChange={(event) => {setDepartmentHeadID(event.target.value)}}/>
        <lable>Department Email</lable>
        <input type="text" onChange={(event) => {setDepartmentEmail(event.target.value)}}/>
        <lable>Department Supervisor ID</lable>
        <input type="text" onChange={(event) => {setDepartmentSupervisor(event.target.value)}}/>
        <button onClick={addDepartment}>Add a record</button>
        <div>-----------------------------------------------------------------------------------------------------------------------------------------------------</div>
        <button onClick={getDepartment}>Display all records </button>
        {departmentList.map((val,key)=>{ return(
          <div className="timesheet">
            <div> 
              <h3>Department ID: {val.Department_ID}</h3>
              <h3>Department: {val.Department_Name}</h3>
              <h3>Head ID: {val.Department_Head_ID}</h3>
              <h3>Email: {val.Department_Email}</h3>
              <h3>Supervisor ID: {val.Department_Supervisor}</h3>

            <div align="center"><button onClick={() => {deleteDepartment(val.Department_ID); }} > Delete </button></div>

            </div>
            <div className="updateBox"> <h2 align="center">Edit this record  </h2>   
                      <div><lable> Department </lable>
                      <input type="text"  onChange={(event) => {setNewDepartmentName(event.target.value)}}/></div>
                      <div><lable>Head ID</lable>
                      <input type="text" placeholder="Enter an existing Employee ID" onChange={(event) => {setNewDepartmentHeadID(event.target.value)}}/></div>
                      <div><lable>Department Email</lable>
                      <input type="text" onChange={(event) => {setNewDepartmentEmail(event.target.value)}}/></div>
                      <div><lable>Supervisor ID </lable>
                      <input type="text" placeholder="Enter an existing Employee ID" onChange={(event) => {setNewDepartmentSupervisor(event.target.value)}}/></div>
                      <div align="center"><button className="updateB" onClick={()=>{updateDepartment(val.Department_ID);}}> {" "} Update </button></div>
            </div>   
          </div>

         )
      })}
      <div>---------------------------------------------------------------------------------------------------------------------------------------------</div>
    </div>
  </div>
);
}

export default Dpartment;

