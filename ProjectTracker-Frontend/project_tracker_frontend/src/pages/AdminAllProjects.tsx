import React, {useEffect, useState} from 'react';
import {fetchAllProjects, Project, User} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import {Card, Button, CardGroup, Row, Col} from 'react-bootstrap';
import classes from "../component/layout/Layout.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";


interface AdminAllProjectsProps{
    users: User[];
    project: Project[];
    fetchAllProjects: Function;
}

const _AdminAllProjects: React.FunctionComponent<AdminAllProjectsProps> = (props)=> {

    const [project_id, setProject_id] = useState(0);
    const [project_name, setProject_name] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndtDate] = useState(new Date());
    const [userToAdd, setUserToAdd] = useState("")
    const [warning, setWarning] = useState("");

    const localDBUrl = `http://3.144.217.113:8080/api/project/`;

    useEffect(()=>{

    },[project_name])


    let temp: any = {
        project_id,
        project_name,
        start_project_date : startDate,
        end_project_date : endDate
    }

    const updateProject = async (e: Project|any) => {
        e.preventDefault()
        setProject_id(e.project_id)
        let project: any = {
            project_id,
            project_name,
            start_project_date : startDate,
            end_project_date : endDate
        }
        console.log(project.start_project_date);
        const resp = await axios.post<Project>(localDBUrl+"update/"+project_id, project);
        console.log(resp.data)
        if (resp.data.project_id !== 0) {
            setWarning(resp.data.project_name + " Was Updated!! ")
        } else {
            setWarning("Project Couldn't be Updated!! something went wrong!!!")
        }
    }

    const addUserToProject = async (e:any) => {
        const resp = await axios.post<Project>("http://3.144.217.113:8080/api/project/adduser/"+e+"/"+userToAdd);
        console.log(resp.data)
        if (resp.data.project_id !== 0) {
            setWarning(resp.data.project_name + " Was Updated!! ")
        } else {
            setWarning("Project Couldn't be Updated!! something went wrong!!!")
        }
    }

    const setProjectToUpdateState = (project: Project) =>{
        setProject_id(project.project_id);
        setProject_name(project.project_name);
        // @ts-ignore
        setStartDate(Date.parse(project.start_project_date));
        
        console.log(project.end_project_date);
        // @ts-ignore
        setEndtDate(Date.parse(project.end_project_date));

    }


    const renderUpdateProjectForm = () : JSX.Element => {
        console.log("Update Project Form Called!!")
        return (
            <div className={"border border-info mx-auto"}  key={project_id} style={{border:"3em"}}>
                <div>
                    <form onSubmit={updateProject}>
                        <h3>Update Project Information</h3>
                        <h2>{warning}</h2>
                        <div className="form-group">
                            <label>Project ID</label>
                            <input type="text" className="form-control"
                                   value={project_id} name="user_id" disabled/>
                        </div>
                        <div className="form-group">
                            <label>Project name</label>
                            <input type="text" className="form-control" onChange={(e) => setProject_name(e.target.value)}
                                   value={project_name} name="projectname" required/>
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <DatePicker
                                closeOnScroll={true}
                                selected={startDate}
                                onChange={(date:Date) => setStartDate(date)}
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <DatePicker
                                closeOnScroll={true}
                                selected={endDate}
                                onChange={(date:Date) => setEndtDate(date)}
                            />
                        </div>
                        <br/>
                        <input type="submit" className="form-control btn btn-primary btn-block" value={"Update Project"}/>

                        <div className="form-group">
                            <label>User ID</label>
                            <input type="number" className="form-control" onChange={(e) => setUserToAdd(e.target.value)}
                                   name="task_note" value={userToAdd} required/>
                                   <br/>
                            <Button onClick={ ()=> addUserToProject(project_id)} variant="primary" > Add User To Project</Button>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>

        )
    }

    const renderProjects = () : JSX.Element[]=> {
        return props.project.map((project: Project) => {
            // @ts-ignore
            return (
                <Col>
                    <Card key={project.project_id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{project.project_name}</Card.Title>
                            <Card.Text>
                                Project Start :{project.start_project_date}
                                <br/>
                                Project End Date: {project.end_project_date}
                            </Card.Text>
                            <Button onClick={ ()=> setProjectToUpdateState(project)} variant="primary" >Update Project</Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
    }
    const onClickFetchProjects = ():void => {
        props.fetchAllProjects();
    }

    return (
        <div className={classes.sideBarContent}>
            <button onClick={onClickFetchProjects}>FETCH All Projects</button>
            {renderUpdateProjectForm()}
            <CardGroup>
                <Row xs={2} md={"auto"} lg={"auto"} className="g-4">
                    {renderProjects()}
                </Row>
            </CardGroup>
        </div>
    );
}


const  mapStateToProps = ({users, project}: StoreState):{users : User[]; project : Project[]} => {
    return {users, project}
}

export const AdminAllProjects = connect(
    mapStateToProps,
    {fetchAllProjects}
)(_AdminAllProjects)
