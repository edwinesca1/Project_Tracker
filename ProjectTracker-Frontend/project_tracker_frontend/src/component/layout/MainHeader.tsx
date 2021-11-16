import {NavLink, useNavigate} from "react-router-dom";
import classes from './MainHeader.module.css';
import React, {useEffect, useState} from "react";
import {loginUser, logoutUser, User} from "../../redux/actions";
import {StoreState} from "../../redux/reducers";
import {connect} from "react-redux";

interface MainHeaderProps {
    userLogin: User;
    logged: boolean;
    setLogged: any;
    logoutUser: Function;
}

const _MainHeader: React.FunctionComponent<MainHeaderProps> = props => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.logged) {
            navigate("/login");
        }
        if (props.userLogin.user_id !== 0) {
            props.setLogged(true);
            navigate("/home");
        }
    }, [props.userLogin])

    const onClickLogoutUser = () => {
        logoutUser();
        props.setLogged(false);

    }

    return (
        <header className={classes.header}>
            <nav> {console.log(props.logged)}
                <ul>
                    <li>{props.logged ?
                        <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to='/home'>
                            Home
                        </NavLink> :
                        <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to='/login'>
                            Login
                        </NavLink>}
                    </li>
                    {!props.logged ?
                        <li><NavLink className={(navData) => (navData.isActive ? classes.active : '')} to='/signup'>
                            SignUp
                        </NavLink>
                        </li>: ""}
                    {props.userLogin.userRole ==="ADMIN" && props.logged ?<li><NavLink className={(navData) => (navData.isActive ? classes.active : '')} to='/admin_all_users'>
                        Admin Users
                    </NavLink>
                    </li>: ""}
                    {props.userLogin.userRole ==="ADMIN" && props.logged?<li><NavLink className={(navData) => (navData.isActive ? classes.active : '')} to='admin_all_projects'>
                        Admin Projects
                    </NavLink>
                    </li>: ""}
                    {props.userLogin.userRole ==="ADMIN" && props.logged?<li><NavLink className={(navData) => (navData.isActive ? classes.active : '')} to='admin_all_tasks'>
                        Admin Tasks
                    </NavLink>
                    </li>: ""}
                    <li>{props.logged ? <NavLink className={(navData) => (navData.isActive ? classes.active : "")}
                                                 onClick={onClickLogoutUser} to={`/login`}>
                        Logout
                    </NavLink> : ""}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

const mapStateToProps = ({userLogin}: StoreState): { userLogin: User; } => {
    return {userLogin}
}

export const MainHeader = connect(
    mapStateToProps,
    {logoutUser}
)(_MainHeader)
