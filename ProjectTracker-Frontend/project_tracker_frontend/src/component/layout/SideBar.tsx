import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link, NavLink} from 'react-router-dom';
import './Navbar.css';
import {IconContext} from 'react-icons';

import * as IoIcons from 'react-icons/io';
import {UserHomeComponent} from "../UserHomeComponent";
import classes from "./MainHeader.module.css";


const SideBar: React.FC<any> = ({updateClickedPage}: any) => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    // const onClickPageProfile = () => {
    //     updateClickedPage(1)
    // }

    return (

        <IconContext.Provider value={{color: '#b78d8d'}}>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}/>

                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {/*Mini Nav Options Start Here*/}
                    <li className={"nav-text"}>
                        <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"/home"}>
                            <AiIcons.AiFillProfile/>Profile
                        </NavLink>
                    </li>
                    <li className={"nav-text"}>
                        <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"/user_tasks"}>
                            <FaIcons.FaCartPlus/>Your Tasks
                        </NavLink>
                    </li>
                    <li className={"nav-text"}>
                        <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"/new_project"}>
                            <IoIcons.IoMdPeople/>New Project
                        </NavLink>
                    </li>
                    <li className={"nav-text"}>
                        <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"/new_task"}>
                            <FaIcons.FaEnvelopeOpenText/>New Task
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </IconContext.Provider>
    );
}

export default SideBar;