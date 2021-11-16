import React from "react";
import {Route, Routes, Navigate} from 'react-router-dom';
import Layout from "./component/layout/Layout";
import {Login} from "./component/Login";
import {Home} from "./pages/Home";
import {AdminAllUsers} from "./pages/AdminAllUsers";
import {Signup} from "./component/Signup";
import "./application.css"
import {UserTasks} from "./pages/UserTasks";
import {NewProject} from "./pages/NewProject";
import {NewTask} from "./pages/NewTask";
import {AdminAllProjects} from "./pages/AdminAllProjects";
import {AdminAllTasks} from "./pages/AdminAllTasks";

const Application: React.FunctionComponent<{}> = props => {

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Navigate replace to='/login'/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/admin_all_users' element={<AdminAllUsers/>}/>
                <Route path='/admin_all_projects' element={<AdminAllProjects/>}/>
                <Route path={"/admin_all_tasks"} element={<AdminAllTasks/>}/>
                <Route path={"/user_tasks"} element={<UserTasks/>}/>
                <Route path={"/new_project"} element={<NewProject/>}/>
                <Route path={"/new_task"} element={<NewTask/>}/>
                {/*<Route path='*' element={<NotFound />} />*/}
            </Routes>
        </Layout>
    );
}

export default Application;