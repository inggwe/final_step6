const express =require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

PORT = 3001;   


// Database
const db= mysql.createConnection({
  host: "remotemysql.com",
  user: "JTJDEblqRU",
  password: "xwnWqtZFiV",
  database: "JTJDEblqRU"
});

/*************************/
app.post('/empjob', (req,res) => {
  console.log(req.body);  //see the details
  const jobID = req.body['Job_ID'];
  const employeeID = req.body['Employee_ID'];
  const supervisorID= req.body['Supervisor_ID'];
  const startDate = req.body['Start_Date'];
  const endDate  = req.body['End_Date'];

  db.query("INSERT INTO Employee_Job (Job_ID, Employee_ID, Supervisor_ID, Start_Date, End_Date) VALUES(?,?,?,?,?)",
  [jobID, employeeID, supervisorID, startDate, endDate],
  (err, result) => { if (err) {console.log(err);} 
                  else {res.send(res.send("Value Inserted!"));}
                  }
             );
  });

app.get('/empjob',(req,res) => {
  db.query("SELECT * FROM Employee_Job",
      (err, result) => { if(err) {console.log(err)}
                         else {res.send(result)};
                      });
});

/*Update a record*/ 
app.put('/UpdateEmpjob',(req,res) => {
  const jobID = req.body['Job_ID'];
  const employeeID = req.body['Employee_ID'];
  const supervisorID= req.body['Supervisor_ID'];
  const startDate = req.body['Start_Date'];
  const endDate  = req.body['End_Date'];

db.query(
  "UPDATE Employee_Job SET Supervisor_ID=?, Start_Date=?, End_Date=? WHERE Job_ID =? AND Employee_ID=? ",
  [supervisorID, startDate, endDate, jobID, employeeID],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }
);
});

app.delete('/DeleteEmpjob/:Job_ID/:Employee_ID', (req, res) => {
const jobID = req.params['Job_ID'];
const employeeID = req.params['Employee_ID'];
//console.log(departmentID);
  db.query("DELETE FROM Employee_Job WHERE Job_ID = ? AND Employee_ID = ?", 
  [jobID, employeeID], 
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});





/*************************/
app.post('/department', (req,res) => {
  console.log(req.body);  //see the details
  const departmentID = req.body['Department_ID'];
  const departmentName= req.body['Department_Name'];
  const departmentHeadID = req.body['Department_Head_ID'];
  const departmentEmail = req.body['Department_Email'];
  const departmentSupervisor  = req.body['Department_Supervisor'];

  db.query("INSERT INTO Department (Department_ID, Department_Name, Department_Head_ID, Department_Email, Department_Supervisor) VALUES(?,?,?,?,?)",
  [departmentID, departmentName, departmentHeadID, departmentEmail, departmentSupervisor],
  (err, result) => { if (err) {console.log(err);} 
                  else {res.send(res.send("Value Inserted!"));}
                  }
             );
  });

app.get('/department',(req,res) => {
  db.query("SELECT * FROM Department",
      (err, result) => { if(err) {console.log(err)}
                         else {res.send(result)};
                      });
});

/*Update a record*/ 
app.put('/UpdateDepartment',(req,res) => {

  const departmentID = req.body['Department_ID'];
  const departmentName= req.body['Department_Name'];
  const departmentHeadID = req.body['Department_Head_ID'];
  const departmentEmail = req.body['Department_Email'];
  const departmentSupervisor  = req.body['Department_Supervisor'];

db.query(
  "UPDATE Department SET Department_Name=?, Department_Head_ID=?, Department_Email=?, Department_Supervisor=?  WHERE Department_ID = ?",
  [departmentName, departmentHeadID, departmentEmail, departmentSupervisor, departmentID],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }
);
});

app.delete('/DeleteDepartment/:Department_ID', (req, res) => {
const departmentID = req.params['Department_ID'];
//console.log(departmentID);
db.query("DELETE FROM Department WHERE Department_ID = ?", departmentID, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }
});
});




//********************/
app.post('/employee', (req,res) => {
  console.log(req.body);  //see the details
  const employeeID = req.body['Employee_ID'];
  const employeeFirstName = req.body['Employee_First_Name'];
  const employeeLastName = req.body['Employee_Last_Name'];
  const employeeEmail = req.body['Employee_Email'];
  const employeePhoneNumber= req.body['Employee_Phone_Number'];
  const genderIdentity= req.body['Gender_Identity'];
  const birthday = req.body['Birthday'];
  const state = req.body['State'];
  const city = req.body['City'];

  db.query("INSERT INTO Employee (Employee_ID, Employee_First_Name, Employee_Last_Name, Employee_Email, Employee_Phone_Number, Gender_Identity, Birthday, State, City) VALUES(?,?,?,?,?,?,?,?,?)",
  [employeeID, employeeFirstName, employeeLastName, employeeEmail, employeePhoneNumber, genderIdentity, birthday, state, city],
  (err, result) => { if (err) {console.log(err);} 
                  else {res.send(res.send("Value Inserted!"));}
                  }
             );
  });

app.get('/employee',(req,res) => {
  db.query("SELECT * FROM Employee",
      (err, result) => { if(err) {console.log(err)}
                         else {res.send(result)};
                      });
});

/*Update a record*/ 
app.put('/UpdateEmployee',(req,res) => {

  const employeeID = req.body['Employee_ID'];
  const employeeFirstName = req.body['Employee_First_Name'];
  const employeeLastName = req.body['Employee_Last_Name'];
  const employeeEmail = req.body['Employee_Email'];
  const employeePhoneNumber= req.body['Employee_Phone_Number'];
  const genderIdentity= req.body['Gender_Identity'];
  const birthday = req.body['Birthday'];
  const state = req.body['State'];
  const city = req.body['City'];
  
db.query(
  "UPDATE Employee SET Employee_First_Name=?, Employee_Last_Name=?, Employee_Email=?, Employee_Phone_Number=?, Gender_Identity=?, Birthday=?, State=?, City=?  WHERE Employee_ID = ?",
  [employeeFirstName, employeeLastName, employeeEmail, employeePhoneNumber, genderIdentity, birthday, state, city, employeeID],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }
);
});

app.delete('/DeleteEmployee/:Employee_ID', (req, res) => {
const employeeID = req.params['Employee_ID'];
//console.log(employee_ID);
db.query("DELETE FROM Employee WHERE Employee_ID = ?", employeeID, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }
});
});

//*************************/
app.post('/timesheet', (req,res) => {
    console.log(req.body);  //see the details
    const timesheetID = req.body['Time_Sheet_ID'];
    const employeeID = req.body['Employee_ID'];
    const clockDate = req.body['Clock_Date'];
    const clockIn = req.body['Clock_In'];
    const clockOut = req.body['Clock_Out'];
  
    db.query("INSERT INTO Timesheet (Time_Sheet_ID, Employee_ID, Clock_In, Clock_Out, Clock_Date) VALUES(?,?,?,?,?)",
    [timesheetID, employeeID, clockIn, clockOut, clockDate],
    (err, result) => { if (err) {console.log(err);} 
                    else {res.send(res.send("Value Inserted!"));}
                    }
               );
    });

app.get('/timesheet',(req,res) => {
    db.query("SELECT * FROM Timesheet",
        (err, result) => { if(err) {console.log(err)}
                           else {res.send(result)};
                        });
});

/*Update a record*/ 
app.put('/UpdateTimesheet',(req,res) => {
 
    const timesheetID = req.body['Time_Sheet_ID'];
    const employeeID = req.body['Employee_ID'];
    const clockDate = req.body['Clock_Date'];
    const clockIn = req.body['Clock_In'];
    const clockOut = req.body['Clock_Out'];
    
  db.query(
    "UPDATE Timesheet SET Employee_ID=?,  Clock_In=?, Clock_Out=?, Clock_Date=?  WHERE Time_Sheet_ID = ?",
    [employeeID, clockIn, clockOut, clockDate, timesheetID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/DeleteTimesheet/:Time_Sheet_ID', (req, res) => {
  const timesheetID = req.params['Time_Sheet_ID'];
  //console.log(timesheetID);
  db.query("DELETE FROM Timesheet WHERE Time_Sheet_ID = ?", timesheetID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//########################

  app.post('/job',(req, res) => {
    const jobID = req.body['Job_ID']
    const departmentID = req.body['Department_ID']
    const jobTitle = req.body['Job_Title']
    const hourlyWage = req.body['Hourly_Wage']

    db.query("INSERT INTO Job (Job_ID, Department_ID, Job_Title, Hourly_Wage) VALUES(?,?,?,?)",
    [jobID, departmentID, jobTitle, hourlyWage],
    (err,result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send("Values Inserted");
        }
    }
    );
});

app.get('/job',(req, res)=> {
    db.query("SELECT* FROM Job", 
      (err, result) => { if(err) {console.log(err)}
      else {res.send(result)};
   });
});


/*Update a record*/ 
app.put('/UpdateJob',(req,res) => {
  const jobID = req.body['Job_ID']
  const departmentID = req.body['Department_ID']
  const jobTitle = req.body['Job_Title']
  const hourlyWage = req.body['Hourly_Wage']

db.query(
  "UPDATE Job SET Department_ID=?, Job_Title=?, Hourly_Wage=?  WHERE Job_ID = ?",
  [ departmentID, jobTitle, hourlyWage, jobID],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }
);
});

app.delete('/DeleteJob/:Job_ID', (req, res) => {
const jobID = req.params['Job_ID'];
//console.log(timesheetID);
db.query("DELETE FROM Job WHERE Job_ID = ?", jobID, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }
});
});



//########################
app.get('/payroll/:Clock_Date/:Employee_Id',(req,res) => {
  const employeeID = req.params['Employee_Id'];
  const yearMonth = req.params['Clock_Date'];
  console.log(req);
  console.log(employeeID);
  console.log(yearMonth);
  db.query(
    "WITH cte1 AS (SELECT Time_Sheet_ID, Clock_In, Clock_Date, Clock_Out, Employee_Id, timediff(Clock_Out, Clock_IN) AS hours FROM Timesheet WHERE DATE_FORMAT(Clock_Date,'%Y-%m')= ?) SELECT Employee_Id, sum(hours)/10000 as Total_hrs FROM cte1 GROUP BY Employee_Id HAVING Employee_Id = ?",

    [yearMonth, employeeID],

    (err, result) => {
      if (err) {console.log(err);} 
      else {console.log(result);
            res.send(result);
      }
    }
  );
});



/*
        Axios.get("http://localhost:3001/payroll", { 
            Clock_Date: yearMonth,
            Employee_ID: employeeID, 
            }).then(() => {
            //console.log("SUCCESS!");
            //use radius structuring
            setPayrollList([...payrollList, {
                Clock_Date: yearMonth,
                Employee_ID: employeeID,  
                }]);
    
            })                                                           
         };
         */




app.listen(PORT, ()=> {console.log("Your server is running on port 3001")});
