import React, {Fragment, useEffect, useRef, useState} from 'react';
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import {UserHomeComponent} from "../component/UserHomeComponent";
import {loginUser, logoutUser,User} from "../redux/actions";
import {Route, Routes} from 'react-router-dom';
import SideBar from "../component/layout/SideBar";
import classes from "../component/layout/Layout.module.css";



interface HomeProps{
    userLogin: User;
}

const _Home: React.FunctionComponent<HomeProps> = props => {
    useEffect(() => {
    },[])

    return (
        <div>
            <SideBar/>
            <section className={classes.sideBarContent}>
                <UserHomeComponent/>
            </section>
        </div>
    );
}
const  mapStateToProps = ({userLogin}: StoreState):{userLogin : User;} => {
    return {userLogin}
}

export const Home = connect(
    mapStateToProps,
    {logoutUser,loginUser}
)(_Home)