import '../App.css';
import{ useState } from "react";
import Axios from 'axios'
function Job() {

  const[Job_ID, setJobID] = useState("");
  const[Department_ID, setDepartmentID] = useState("");
  const[Job_Title, setJobTitle] = useState("");
  const[Hourly_Wage, setHourlyWage] = useState([0]);
  
//   const[newWage,setNewWage] = useState(0);
  const[newJobID, setNewJobID] = useState("");
  const[newDepartmentID, setNewDepartmentID] = useState("");
  const[newJobTitle, setNewJobTitle] = useState("");
  const[newHourlyWage, setNewHourlyWage] = useState([0]);

  const[jobList, setJobList] = useState([]);
   
  const addJob = () => {
    console.log(Job_ID);
    Axios.post("flip1.oregonstate.engr:20500/job",{
      Job_ID: Job_ID,
      Department_ID: Department_ID,
      Job_Title: Job_Title,
      Hourly_Wage: Hourly_Wage
    }).then(()=> {
      console.log("success")
    })

  }

  const getJobs = () => {
    console.log(Job_ID);
    Axios.get("flip1.oregonstate.engr:20500/jobs").then((response)=> {
      console.log("response")
      setJobList(response.data);
    });
  }
  
//   const updateHourlyWage = (Job_ID) => {
//     console.log("test")
//     Axios.put(("http://localhost:20500/updateJob", {Hourly_Wage: newWage, Job_ID: Job_ID}).then((response) =>{
//      alert("update")
//      console.log("test")
//     })
//     );  
//   };
const updateJob = (Job_ID) => {
    Axios.put("flip1.oregonstate.engr:20500/updateJob", {
        
        Department_ID:newDepartmentID, 
        Job_Title:newJobTitle, 
        Hourly_Wage:newHourlyWage, 
        Job_ID:Job_ID }).then(

     (response) => {
        setJobList(
          jobList.map((val) => {
            return val.Job_ID == Job_ID
              ? {
                  Job_ID: val.Job_ID,
                  Department_ID:newDepartmentID, 
                  Job_Title:newJobID, 
                  Hourly_Wage:newHourlyWage
                 
                }
              : val;
          })
        );
      }
    );
  };
  
  const deleteJob = (Job_ID) => {
    Axios.delete(`flip1.oregonstate.engr:20500/deleteJob/${Job_ID}`).then((response) => {
      setJobList(
        jobList.filter((val) => {
          return val.Job_ID != Job_ID;
        })
      );
    });
  };
  // const displayInfo = () => {
  //   console.log(Job_ID + Department_ID + Job_Title + Hourly_Wage);
  // }
  return (
    <div className="App">
      <div className ="information">
        <label>Job_ID</label>
        <input type="text" onChange={(event)=>{setJobID(event.target.value)}}/>
        <label>Department_ID</label>
        <input type="text"onChange={(event)=>{setDepartmentID(event.target.value)}}/>
        <label>Job_Title</label>
        <input type="text"onChange={(event)=>{setJobTitle(event.target.value)}}/>
        <label>Hourly_Wage</label>
        <input type="number"onChange={(event)=>{setHourlyWage(event.target.value)}}/>
        <button onClick={addJob}>add Job</button>
      </div>
      <div className="jobs">
        <button onClick={getJobs}>Show Jobs</button>
        {jobList.map((val, key) =>{
          return <div className="show-jobs">
            <div>
                <h3>Job_ID: {val.Job_ID}</h3>
                <h3>Department_ID: {val.Department_ID}</h3>
                <h3>Job_Title: {val.Job_Title}</h3>
                <h3>Hourly_Wage: {val.Hourly_Wage}</h3>

                <div align="center"><button onClick={() => {deleteJob(val.Job_ID); }} > Delete </button></div>
            </div>
                {/* {" "}
                <input type="text" placeholder="100.." onChange={(event)=>{setNewWage(event.target.value)}}></input>
                <button onClick={() =>{updateHourlyWage(val.Job_ID)}}>Update</button> */}
                <div className="updateBox"> <h2 align="center">Edit this record  </h2>
                       
                      <div><lable> Department_ID</lable>
                      <input type="text" placeholder="Enter an existing Department_ID" onChange={(event) => {setNewDepartmentID(event.target.value)}}/></div>
                      <div><lable>Job_Title </lable>
                      <input type="text" onChange={(event) => {setNewJobTitle(event.target.value)}}/></div>
                      <div><lable>Hourly_Wage</lable>
                      <input type="number" onChange={(event) => {setNewHourlyWage(event.target.value)}}/></div>
                      <div align="center"><button className="updateB" onClick={()=>{updateJob(val.Time_Sheet_ID);}}> {" "} Update </button></div>
            </div>   

            
        </div>
        })}
     </div>
    </div>
  );
}

export default Job;