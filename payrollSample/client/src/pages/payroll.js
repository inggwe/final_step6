import "../App.css";
import{useState} from "react";
import Axios from 'axios';
import React from 'react';

function Payroll() {
    const[yearMonth, setYearMonth] = useState("");
    const[employeeID, setEmployeeID] = useState("");

    const [payrollList, setPayrollList] = useState([]);

    const getHours = (Employee_Id, Clock_Date) => {
        Axios.get(`http://localhost:3001/payroll/${Employee_Id}/${Clock_Date}`).then((response) => {
            console.log(Employee_Id);
            console.log(Clock_Date);
            console.log(response);
            setPayrollList(response.data);
            });                                                           
        };
        
    return (
        <div className="App">
            <nav class="crumbs">
                <ol>
                    <li class="crumb"><a href="/">HomePage </a></li>
                    <li class="crumb">Employee Payroll Info</li>
                </ol>
            </nav>

            <div >
                <p>Try insert 2009-09 and EM4</p>
                <lable>Year-Month </lable>
                <input type="month" onChange={(event) => {setYearMonth(event.target.value)}}/>
                <lable>Employee ID </lable>
                <input type="text" onChange={(event) => {setEmployeeID(event.target.value)}}/>
                <button onClick={()=>{getHours(yearMonth, employeeID);}}> {" "}Search</button>
                {payrollList.map((val,key)=>{ 
                    return(
                    <div className="timesheet">
                        <h3>totalHrs: {val.Total_hrs}</h3>
                        <h3>Employee ID: {val.Employee_Id}</h3>
                    </div>
            
                )})}
                
               
            </div>       
        </div>
    );
    }


export default Payroll;
