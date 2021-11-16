import React, {Component, useState} from "react";
import { Project} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import axios from "axios";
import SideBar from "../component/layout/SideBar";
import classes from "../component/layout/Layout.module.css";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";



interface NewProjectProps {
    project : Project[]
}

const _NewProject: React.FunctionComponent<NewProjectProps> = (props) => {
    const [project_id, setProject_id] = useState(0);
    const [project_name, setProject_name] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndtDate] = useState(new Date());
    const [warning, setWarning] = useState("");

    const urlApi = `http://3.144.217.113:8080/api/project/save` ;

    const saveProject = async (e: any) => {
        e.preventDefault()
        let temp: any = {
            project_id,
            project_name,
            start_project_date : startDate,
            end_project_date : endDate
        }
        const resp = await axios.post<Project>(urlApi, temp);
        if (resp.data.project_id !== 0) {
            setWarning(resp.data.project_name + " Was Created")
        } else {
            setWarning("Project Couldn't be Created something went wrong!!!")
        }
    }

    return (
        <div>
            <SideBar/>
            <section className={classes.sideBarContent}>
                <form onSubmit={saveProject}>
                    <h3>New Project</h3>
                    <h2>{warning}</h2>
                    <div className="form-group">
                        <label>Project name</label>
                        <input type="text" className="form-control" onChange={(e) => setProject_name(e.target.value)}
                               placeholder="Project name" name="pro" required/>
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
                    <input type="submit" className="form-control btn btn-primary btn-block" value={"Create Project"}/>
                </form>
            </section>
        </div>
    );
}

const mapStateToProps = ({project}: StoreState): { project: Project[] } => {
    return {project}
}

export const NewProject = connect(
    mapStateToProps,
    {}
)(_NewProject)