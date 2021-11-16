import React, {useEffect, useState} from 'react';
import {fetchAllProjects, loginUser, Project, Task, User} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import {Card, Button, CardGroup, Row, Col} from 'react-bootstrap';
import classes from "../component/layout/Layout.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import SideBar from "../component/layout/SideBar";


interface UserTasksProps{
    users: User[];
    project: Project[];
    userLogin: User;
    fetchAllProjects: Function;
}
export interface FullUserProjectTasks {
    user_id: number;
    email: string;
    firstname: string;
    lastname : string;
    password : string;
    profpic  : string;
    userRole: string;
    username : string;
    user_projects : Project[];
    user_tasks : Task[];
}


const _UserTasks: React.FunctionComponent<UserTasksProps> = (props)=> {

    const [task_note, setTask_note] = useState("");

    const [warning, setWarning] = useState("");

    const localDBUrl = `http://3.144.217.113:8080/api/task/save/`;
    const localDBUrlUserProjectsTasks = `http://3.144.217.113:8080/api/users/`;

    let fullUser:FullUserProjectTasks = {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        profpic: "",
        userRole: "",
        user_id: 0,
        user_projects: [],
        user_tasks: [],
        username: ""

    }
    const [finsh,setFinish] = useState(false);
    let taskToFinish:Task = {
        task_description: "", task_end_date: "", task_id: 0, task_note: "", task_start_date: ""
    }


    useEffect(()=>{
        console.log(props.userLogin)
    },[finsh])



    const finishTask = async (e: Task|any) => {
        // e.preventDefault()
        const resp = await axios.post<Task>(localDBUrl+props.userLogin.user_id, taskToFinish);
        console.log(resp.data)
        if (resp.data.task_id !== 0) {
            setWarning(resp.data.task_description + " Was Updated!! ")
        } else {
            setWarning("Task Couldn't be Updated!! something went wrong!!!")
        }
    }





    const renderUserProjects = () : JSX.Element[]=> {
        // @ts-ignore
        return props.userLogin.user_projects.map((project: Project) => {
            // @ts-ignore
            return (
                <Col>
                    <Card key={project.project_id} style={{ width: '18rem' }}>
                        <Card.Body>
                            {warning}
                            <Card.Title>{project.project_name}</Card.Title>
                            <Card.Text>
                                Project Start :{project.start_project_date}
                                <br/>
                                Project End Date: {project.end_project_date}
                            </Card.Text>
                            <Button variant="danger" >Check in with your PM to Update</Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
    }

    const renderUserTasks = () : JSX.Element[]=> {
        // @ts-ignore
        return props.userLogin.user_tasks.map((task: Task) => {
            // @ts-ignore
            return (
                <Col>
                    <Card key={task.task_id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{task.task_description}</Card.Title>
                            <Card.Subtitle>Note: {task.task_note}</Card.Subtitle>
                            <Card.Text>
                                Start Date :{task.task_start_date}
                                <br/>
                                Due Date: {task.task_end_date}
                            </Card.Text>
                            <div className="form-group">
                                <label>Task Notes</label>
                                {task.task_note !== ""? <input type="text" className="form-control" value={task.task_note}
                                                               name="task_note" disabled /> :
                                    <input type="text" className="form-control" onChange={(e) => setTask_note(e.target.value)}
                                           name="task_note" required/>}
                            </div>
                            {task.task_note !== ""? <Button variant="outline-success" >Completed</Button> :
                                <Button onClick={ ()=> {
                                    taskToFinish.task_id = task.task_id;
                                    taskToFinish.task_description = task.task_description;
                                    taskToFinish.task_start_date = task.task_start_date;
                                    taskToFinish.task_end_date = task.task_end_date;
                                    taskToFinish.task_note = task_note;
                                    finishTask(taskToFinish);
                                }} variant="primary" >Finish Task</Button>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
    }

    const onClickFetchUserProjectsAndTasks =async () =>  {
        const resp = await axios.get<FullUserProjectTasks>(localDBUrlUserProjectsTasks+props.userLogin.user_id);
        fullUser = resp.data;
        setFinish(true);
    }

    return (
        <section>
            <SideBar/>
            <div className={classes.sideBarContent}>
                <button onClick={onClickFetchUserProjectsAndTasks}>FETCH All Current User Projects and Tasks!!</button>
                <hr/>
                <h1 className={"text-center"}>User Projects</h1>
                <CardGroup>
                    <Row xs={2} md={"auto"} lg={"auto"} className="g-4">
                        {renderUserProjects()}
                    </Row>
                </CardGroup>
                <hr/>
                <br/>
                <h1 className={"text-center"}>User Tasks</h1>
                <CardGroup>
                    <Row xs={2} md={"auto"} lg={"auto"} className="g-4">
                        {renderUserTasks()}
                    </Row>
                </CardGroup>
            </div>
        </section>

    );
}


const  mapStateToProps = ({users, project,userLogin} : StoreState):{users: User[];project: Project[]; userLogin : User} => {
    return {users, project,userLogin}
}

export const UserTasks = connect(
    mapStateToProps,
    {fetchAllProjects}
)(_UserTasks)
