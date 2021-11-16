import React, {useState} from 'react';
import {loginUser, logoutUser, User} from "../redux/actions";
import {LoginType} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';


interface LoginProps {
    userLogin: User;
    loginUser: Function;
    logoutUser: Function
}

const _Login: React.FunctionComponent<LoginProps> = (props) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [warning,setWarning] = useState("");
    const navigate = useNavigate();


    const handleChangeUserName = (e: any): void => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e: any): void => {
        setPassword(e.target.value)
    }

    const handleSubmitLogin = (e: any): void => {
        e.preventDefault()
        let user: LoginType = {
            username,
            password
        }
        props.loginUser(user)
        if (sessionStorage.getItem("logged") === "true"){
            console.log(sessionStorage.getItem("logged")    )
            // @ts-ignore
            navigate(`/login`,true)
        }
        if(props.userLogin.user_id === 0) {
            setWarning("Please make sure the username and password correct")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmitLogin}>
                <h3>Sign In</h3>
                <div className={"text-danger"}>{warning}</div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" value={username} onChange={handleChangeUserName} required/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={handleChangePassword} required/>
                </div>
                <br/>
                <input className="form-control btn btn-primary btn-block" type="submit" value="Log In"/>
            </form>
        </div>
    );
}

const mapStateToProps = ({userLogin}: StoreState): { userLogin: User } => {
    return {userLogin}
}

export const Login = connect(
    mapStateToProps,
    {logoutUser, loginUser}
)(_Login)
