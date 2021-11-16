import React, {Fragment, useEffect, useState} from 'react';

import classes from './Layout.module.css';
import {MainHeader} from './MainHeader';

const Layout: React.FunctionComponent<{}> = (props) => {
    const [logged , setLogged] = useState<boolean>(false)
    useEffect(() => {
        console.log(logged)
    },[logged])

    const changeLogged = (e: any) => {
        setLogged(true);
    }
    return (
        <Fragment>
            <MainHeader logged = {logged} setLogged ={setLogged}/>
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    );
};

export default Layout;