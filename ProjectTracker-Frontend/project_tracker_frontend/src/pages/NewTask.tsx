import React, {Component, useState} from "react";
import {Project, Task, User} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import axios from "axios";
import SideBar from "../component/layout/SideBar";
import classes from "../component/layout/Layout.module.css";
import DatePicker from "react-datepicker";


interface NewTaskProps {
    task : Task[],
    userLogin : User
}

const _NewTask: React.FunctionComponent<NewTaskProps> = (props) => {
    const [task_id, setTask_id] = useState(0);
    const [task_description, setTask_description] = useState("");
    const [task_note, setTask_note] = useState("");
    const [task_start_date, setTask_start_date] = useState(new Date());
    const [task_end_date, setTask_end_date] = useState(new Date());
    const [warning, setWarning] = useState("");

    const localDBUrl = `http://3.144.217.113:8080/api/task/save/`;
    const saveTask = async (e: any) => {
        e.preventDefault()
        let task: any = {
            task_id,
            task_description,
            task_note,
            task_start_date,
            task_end_date
        }
        const resp = await axios.post<Task>(localDBUrl+props.userLogin.user_id, task);
        if (resp.data.task_id !== 0) {
            setWarning(resp.data.task_description+ " Was Created")
        } else {
            setWarning("Task Couldn't be Created something went wrong!!!")
        }
    }

    return (
        <div>
            <SideBar/>
            <section className={classes.sideBarContent}>
                <form onSubmit={saveTask}>
                    <h3>New Task</h3>
                    <h2>{warning}</h2>
                    <div className="form-group">
                        <label>Task Description</label>
                        <input type="text" className="form-control" onChange={(e) => setTask_description(e.target.value)}
                               placeholder="Task Description" name="task_description" required/>
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={task_start_date}
                            onChange={(date:Date) => setTask_start_date(date)}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={task_end_date}
                            onChange={(date:Date) => setTask_end_date(date)}
                        />
                    </div>
                    <br/>
                    <input type="submit" className="form-control btn btn-primary btn-block" value={"Create Task!"}/>
                </form>
            </section>
        </div>
    );
}

const mapStateToProps = ({task, userLogin}: StoreState): { task: Task[]; userLogin : User } => {
    return {task, userLogin}
}

export const NewTask = connect(
    mapStateToProps,
    {}
)(_NewTask)