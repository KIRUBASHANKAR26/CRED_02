import React,{ useState,useEffect } from 'react';
import "./style.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios"
import { API } from '../../api/api';


const Taskform = () => {

    const [taskSaved, setTasksaved] = useState([])
    const [createTask,setcreateTask] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputDate, setInputdate] = useState("");
    const [inputTime, setInputtime] = useState("");
    const [editTask, seteditTask] = useState(false)
    const [EditValue, setEditValue] = useState("")
    const [EditDate, setEditDate] = useState("")
    const [EditTime, setEditTime] = useState("")
    const [editId, seteditId] = useState("")
    const [loader,setLoader] = useState(true)
    const [isActive, setIsActive] = useState(true)
    const [userDefault, setDefaultUser] = useState("")

//---------------HandleInput-------------
    const handleInputTask = (e) => {
        setInputValue(e.target.value)
    }  
    const handleInputDate = (e) => {
        setInputdate(e.target.value)
    }  
    const handleInputTime = (e) => {
        setInputtime(e.target.value)
    }    
    const editInputTask = (e) => {
        setEditValue(e.target.value)
    }  
    const editInputDate = (e) => {
        setEditDate(e.target.value)
    }  
    const editInputTime = (e) => {
        setEditTime(e.target.value)
    }
//----------------------Time Convert ,Hours to seconds       
    const hourToSec = (hms) => {
        var a = hms.split(' ');
        var c = a[0].split(":")
        var b = hms.includes("PM")?c[0] - "12":c[0];
        var seconds = (+b) * 60 * 60 + (+c[1]);
        return seconds
    }
//----------------------Time Convert ,sec to hour -------- 
    const secTOhour = (value) => {
        const sec = parseInt(value, 10);
        let hours   = Math.floor(sec / 3600); 
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        return hours+':'+minutes;
    }
//-----------------------Onclick Cancel Button-------
    const cancel = (e) => {
        e.preventDefault();
        setcreateTask(false);
        seteditTask(false)
        setIsActive(true)
    }
    const selectValue = (e) => {
        setDefaultUser(e.target.value);
    }
    
////----------------------- POST METHOD------------------
    const taskDetails = async(e) => {
        e.preventDefault();
        var request = {
            assigned_user: 'user_6beec459915f4507a8d2520e60e03c3e',
            task_date: inputDate,
            task_time: hourToSec(inputTime),
            is_completed:0,
            time_zone: 19800,
            task_msg: inputValue,
          };
        var header = {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY2OTc4NzIsIm5iZiI6MTYyNjY5Nzg3MiwianRpIjoiMTA5MWUxMjgtOTQxYi00NTJlLWI3M2ItZWNlZDIyNGViZDc1IiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgQ1NLIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.r11f-5InJyENZfCM9iXM-t67hP3bBfo7zDw4HqcOaGs',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        console.log(request)
        axios({
            method: 'post',
            url:
              API,
            headers: header,
            data: request
          })
            .catch(function (error) {
                console.log(error.response.data);
            });
        setcreateTask(false)
        setLoader(true)
        setIsActive(true)
        setInputValue("")
        setInputdate("")
        setInputtime("")
        setDefaultUser("Choose");
    }

//---------------------GET METHOD------------------
    useEffect(() => {
        var header = {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY2OTg4MjAsIm5iZiI6MTYyNjY5ODgyMCwianRpIjoiODI3NDkyYTYtZTU3MC00ZTI5LWFmMDUtODA2ZmE2NzlkMjJiIiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgQ1NLIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.I35KPODXv1Iy2LbeCrsy522xqGFOkgXp5gNtIt7NkpU',
              Accept: 'application/json',
              'Content-Type': 'application/json', 
        };
        axios({
            method: 'get',
            url:API,
            headers: header
          })
            .then(function (response) {
                setTasksaved(response.data.results);
                setLoader(false)
            })
            .catch(function (error) {
                console.log(error);
        })
    })
    //---------------On click edit button------------
    const editButton = (e) => {
        setcreateTask(false)
        seteditTask(true)
        var editIndex = e.target.id;

        let editData = taskSaved?.filter((item =>  item.id === editIndex))
        editData?.map(item => 
            {
            seteditId(item.id)
            setEditValue(item.task_msg)
            setEditDate(item.task_date)
            setEditTime(secTOhour(item.task_time))}
        );
    }
    //-----------------Save the edited details and PUT Method
    const updateTask = (e) => {
        e.preventDefault();
        let id = e.target.id;
        let request = {
            assigned_user: 'user_6beec459915f4507a8d2520e60e03c3e',
            task_date: EditDate,
            task_time: hourToSec(EditTime),
            is_completed:0,
            time_zone: 19800,
            task_msg: EditValue,
        }
        var header = {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY2OTg4MjAsIm5iZiI6MTYyNjY5ODgyMCwianRpIjoiODI3NDkyYTYtZTU3MC00ZTI5LWFmMDUtODA2ZmE2NzlkMjJiIiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgQ1NLIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.I35KPODXv1Iy2LbeCrsy522xqGFOkgXp5gNtIt7NkpU',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        console.log(request)
            axios({
                method: 'put',
                url:
                `https://stage.api.sloovi.com/task/lead_0a44acf4b9e94fbab7f865c42436d409/${id}?company_id=company_44a3f04d60ac451e86a22d26d15411a0`
                ,
                headers: header,
                data: request
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
        seteditTask(false)
        setLoader(true)
        setIsActive(true)
    }

    //-------------On Click the Create button to view form------------------
    const create =  (e) => {
        setIsActive(false)
        setcreateTask(true);
    }
    //--------------Delete method------------------
    const deleteTask = async (e) => {
        setIsActive(true)
        e.preventDefault();
        let deleteId = e.target.id;
        console.log("deleteId",deleteId)
        let check = window.confirm("ARE YOU SURE")
        if(check === true){
            var header = {
                Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY2OTg4MjAsIm5iZiI6MTYyNjY5ODgyMCwianRpIjoiODI3NDkyYTYtZTU3MC00ZTI5LWFmMDUtODA2ZmE2NzlkMjJiIiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgQ1NLIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.I35KPODXv1Iy2LbeCrsy522xqGFOkgXp5gNtIt7NkpU',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            };
            axios({
                method: 'delete',
                url:
                `https://stage.api.sloovi.com/task/lead_0a44acf4b9e94fbab7f865c42436d409/${deleteId}?company_id=company_44a3f04d60ac451e86a22d26d15411a0`,
                headers: header,
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
            seteditTask(false);
            setLoader(true)
        }
    }

    return ( 
        <div style={{display:"inline-block",width:"74vw",maxWidth:"100%",position: "relative",
        margin: "7rem 1rem 0 20%"}}>
        <div className="container">
            <div className="form-header">
                <h4>Task {taskSaved?.length}</h4>
                <button onClick={create}><i className="fas fa-plus"></i></button>
            </div>
            <div className={createTask? "form-section active" : "form-section"}> 
                <form>   
                    <div>
                        <h5 style={{marginTop:"0 !important"}}>Task Description</h5>
                        <input type="text"  value={inputValue} onChange={handleInputTask} required/>
                    </div>
                    <div>
                        <div className="date-time">
                            <div>
                                <h5>Date</h5>
                                <input type="date" value={inputDate} onChange={handleInputDate} required/>
                            </div>
                            <div>
                                <h5>Time</h5>
                                <input type="time"  value={inputTime} onChange={handleInputTime} required/>
                            </div>
                        </div>
                        <div>
                            <h5>Assign User</h5>
                            <select value={userDefault} onChange={selectValue} aria-label=".form-select-lg example" required>
                                <option value="Choose" >Choose...</option>
                                <option value="user_6beec459915f4507a8d2520e60e03c3e">Subi</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button className= "cancel-button" onClick={cancel}>Cancel</button>
                            <button type="submit" onClick={taskDetails}>Save</button>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div className={editTask? "edit-form active" : "edit-form"}> 
                <form>   
                    <div>
                        <h5>Task Description</h5>
                        <input type="text"  defaultValue={EditValue} onChange={editInputTask} required/>
                    </div>
                    <div>
                        <div className="date-time">
                            <div>
                                <h5>Date</h5>
                                <input type="date" defaultValue={EditDate} onChange={editInputDate} required/>
                            </div>
                            <div>
                                <h5>Time</h5>
                                <input type="time"  defaultValue={EditTime} onChange={editInputTime} required/>
                            </div>
                        </div>
                        <div>
                            <h5>Assign User</h5>
                            <select  defaultValue="Subi" aria-label=".form-select-lg example" required>
                                <option value="Choose">Choose...</option>
                                <option value="Subi">Subi</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button className="delete-button"  onClick={deleteTask}><i id={editId} className="fas fa-trash-alt"></i></button>
                            <button className= "cancel-button" onClick={cancel}>Cancel</button>
                            <button type="submit" id={editId} onClick={updateTask}>Save</button>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div className={isActive ? "saved-wrapper active" : "saved-wrapper"}>
            {   
               loader?(<CircularProgress />):( taskSaved?.map((item) => 
                
                <div key={item.id} id={item.id}  className="save-data">
                    <div className="img-wrapper">
                        <img src="https://image.flaticon.com/icons/png/512/168/168723.png" alt="placeholder"/>
                    </div>
                    <p>{item.task_msg}</p>
                    <p>{item.task_date}</p>
                    
                    <div className="buttons-wrapper">
                        <button className="edit" onClick={editButton}><i id={item.id} className="fas fa-pencil-alt"></i></button>
                        <button><i className="fas fa-check"></i></button>
                        <button><i className="fas fa-bell"></i></button>
                    </div>
                </div>))
            }
            </div>

        </div>
    </div>    
     );
}

export default Taskform;