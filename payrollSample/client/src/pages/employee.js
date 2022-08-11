import "../App.css";
import{useState} from "react";
import Axios from 'axios';
import React from 'react';

function Employee() {
   //*
    const[employeeID,setEmployeeID]= useState("");
    const[employeeFirstName, setEmployeeFirstName]= useState("");
    const[employeeLastName,setEmployeeLastName]= useState("");
    const[employeeEmail,setEmployeeEmail]= useState("");
    const[employeePhoneNumber,setEmployeePhoneNumber]= useState("");
    const[genderIdentity,setGenderIdentity]= useState("");
    const[birthday, setBirthday]= useState("");
    const[state,setState]= useState("");
    const[city, setCity]= useState("");

    const[NewEmployeeFirstName, setNewEmployeeFirstName]= useState("");
    const[NewEmployeeLastName,setNewEmployeeLastName]= useState("");
    const[NewEmployeeEmail,setNewEmployeeEmail]= useState("");
    const[NewEmployeePhoneNumber,setNewEmployeePhoneNumber]= useState("");
    const[NewGenderIdentity,setNewGenderIdentity]= useState("");
    const[NewBirthday, setNewBirthday]= useState("");
    const[NewState,setNewState]= useState("");
    const[NewCity, setNewCity]= useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    //console.log(Time_Sheet_ID); //test whether it grabs the ID from mysql server
    Axios.post("flip1.oregonstate.engr:20500/employee", { 
        Employee_ID: employeeID, 
        Employee_First_Name: employeeFirstName,
        Employee_Last_Name:employeeLastName,
        Employee_Email:employeeEmail,
        Employee_Phone_Number:employeePhoneNumber,
        Gender_Identity:genderIdentity,
        Birthday:birthday,
        State:state,
        City:city
           //client: server
          }).then(() => {
          //console.log("SUCCESS!");
            //use radius structuring
            setEmployeeList([...employeeList, {
            Employee_ID: employeeID, 
            Employee_First_Name: employeeFirstName,
            Employee_Last_Name:employeeLastName,
            Employee_Email:employeeEmail,
            Employee_Phone_Number:employeePhoneNumber,
            Gender_Identity:genderIdentity,
            Birthday:birthday,
            State:state,
            City:city
           }]);

           })                                                           
     };
 
  const getEmployee = () => {
    //console.log(timesheetID); //test whether it grabs the name from mysql server
    Axios.get("flip1.oregonstate.engr:20500/employee").then((response) => {
      console.log(response);
      setEmployeeList(response.data);
      });                                                           
  };

  const updateEmployee = (Employee_ID) => {
    Axios.put("flip1.oregonstate.engr:20500/UpdateEmployee", {
        Employee_First_Name: NewEmployeeFirstName,
        Employee_Last_Name:NewEmployeeLastName,
        Employee_Email:NewEmployeeEmail,
        Employee_Phone_Number:NewEmployeePhoneNumber,
        Gender_Identity:NewGenderIdentity,
        Birthday:NewBirthday,
        State:NewState,
        City:NewCity, 
        Employee_ID:Employee_ID}).then(

     (response) => {
        setEmployeeList(
            employeeList.map((val) => {
            return val.Employee_ID==Employee_ID
              ? {
                Employee_ID: val.Employee_ID,
                Employee_First_Name: NewEmployeeFirstName,
                Employee_Last_Name:NewEmployeeLastName,
                Employee_Email:NewEmployeeEmail,
                Employee_Phone_Number:NewEmployeePhoneNumber,
                Gender_Identity:NewGenderIdentity,
                Birthday:NewBirthday,
                State:NewState,
                City:NewCity
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (Employee_ID) => {
    Axios.delete(`flip1.oregonstate.engr:20500/DeleteTimesheet/${Employee_ID}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.Employee_ID != Employee_ID;
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
                <li class="crumb">Manage Employees</li>
            </ol>
        </nav>

      <div className="information">
        <lable>Employee ID </lable>
        <input type="text" onChange={(event) => {setEmployeeID(event.target.value)}}/>
        <lable>First Name </lable>
        <input type="text" onChange={(event) => {setEmployeeFirstName(event.target.value)}}/>
        <lable>Last Name </lable>
        <input type="text" onChange={(event) => {setEmployeeLastName(event.target.value)}}/>
        <lable>Email</lable>
        <input type="text" onChange={(event) => {setEmployeeEmail(event.target.value)}}/>
        <lable>Phone Number</lable>
        <input type="text" onChange={(event) => {setEmployeePhoneNumber(event.target.value)}}/>
        <lable>Gender Identity </lable>
        <input type="text" onChange={(event) => {setGenderIdentity(event.target.value)}}/>
        <lable>Birthday </lable>
        <input type="date" onChange={(event) => {setBirthday(event.target.value)}}/>
        <lable>State </lable>
        <input type="text" onChange={(event) => {setState(event.target.value)}}/>
        <lable>city </lable>
        <input type="text" onChange={(event) => {setCity(event.target.value)}}/>
        <button onClick={addEmployee}>Add a record</button>
        <div>-----------------------------------------------------------------------------------------------------------------------------------------------------</div>
        <button onClick={getEmployee}>Display all records </button>
        {employeeList.map((val,key)=>{ return(
          <div className="timesheet">
            <div> 
              <h3>Employee ID: {val.Employee_ID}</h3>
              <h3>First Name: {val.Employee_First_Name}</h3>
              <h3>Last Name: {val.Employee_Last_Name}</h3>
              <h3>Email: {val.Employee_Email}</h3>
              <h3>Phone Number: {val.Employee_Phone_Number}</h3>
              <h3>Gender Identity: {val.Gender_Identity}</h3>
              <h3>Birthday: {val.Birthday}</h3>
              <h3>State: {val.State}</h3>
              <h3>City: {val.City}</h3>

            <div align="center"><button onClick={() => {deleteEmployee(val.Employee_ID); }} > Delete </button></div>

            </div>
            <div className="updateBox"> <h2 align="center">Edit this record </h2>   
                      <div><lable>Last Name </lable>
                      <input type="text" onChange={(event) => {setNewEmployeeFirstName(event.target.value)}}/></div>
                      <div><lable>First Name</lable>
                      <input type="text" onChange={(event) => {setNewEmployeeLastName(event.target.value)}}/></div>
                      <div><lable>Email </lable>
                      <input type="text" onChange={(event) => {setNewEmployeeEmail(event.target.value)}}/></div>
                      <div><lable>Phone </lable>
                      <input type="text" onChange={(event) => {setNewEmployeePhoneNumber(event.target.value)}}/></div>
                      <div><lable>Gender </lable>
                      <input type="text" onChange={(event) => {setNewGenderIdentity(event.target.value)}}/></div>
                      <div><lable>Birthday </lable>
                      <input type="date" onChange={(event) => {setNewBirthday(event.target.value)}}/></div>
                      <div><lable>State </lable>
                      <input type="text" onChange={(event) => {setNewState(event.target.value)}}/></div>
                      <div><lable>City </lable>
                      <input type="text" onChange={(event) => {setNewCity(event.target.value)}}/></div>

                      <div align="center"><button className="updateB" onClick={()=>{updateEmployee(val.Employee_ID);}}> {" "} Update </button></div>
            </div>   
          </div>

         )
      })}
      <div>---------------------------------------------------------------------------------------------------------------------------------------------</div>
    </div>
  </div>
);

//*/
}

export default Employee;
