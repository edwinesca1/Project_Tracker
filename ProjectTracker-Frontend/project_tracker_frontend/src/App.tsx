import React from 'react';
import './App.css';
import './Profilepic.css';
import {connect} from "react-redux";
import {fetchAllUsers, User, logoutUser,loginUser } from "./redux/actions"
import {StoreState} from "./redux/reducers";

interface AppProps {
    users: User[];
    userLogin: User;
    fetchAllUsers: Function;
    loginUser: Function;
    logoutUser: Function
}

class _App extends React.Component<AppProps>{
    state = {
        username: "",
        password: ""
    }

    renderPic(user:User){
        if (user.profpic == null){
            return "https://ptracker-java-react.s3.us-east-2.amazonaws.com/images/profile.png";
        }else {
            return "https://ptracker-java-react.s3.us-east-2.amazonaws.com/images/" + user.profpic;
        }
    }

    renderUsers(): JSX.Element[] {
        return this.props.users.map((user: User) => {
            return (
                <div key={user.user_id}>
                    <div><img src={this.renderPic(user)} alt="" className="img"/></div>
                    {user.username}<br/>
                    {user.firstname}<br/>
                    {user.lastname}<br/>
                    {user.email}<br/>
                    {user.userRole}<br/>
                </div>
            );
        });
    }
    onClickFetchUsers = ():void => {
        this.props.fetchAllUsers();
    }
    //Log In Page Info Starts HERE!!!
    handleChangeUserName = (e: any):void => {
        this.setState({
            username: e.target.value
        })
    }
    handleChangePassword = (e: any):void => {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmitLogin = (e: any):void => {
        e.preventDefault();
        this.props.loginUser(this.state)
    }
    onClickGetCurrentUser = (e: any):void =>{
       // e.target.value = this.props.currentUser.username
        console.log(this.props.userLogin)

}

    render() {
        console.log(this.props.users)
        return (<div>
           <div>
               <form onSubmit={this.handleSubmitLogin}>
                   <label>
                       UserName:
                       <input type="text" value={this.state.username} onChange={this.handleChangeUserName} />
                   </label>
                   <label>
                       UserName:
                       <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
                   </label>
                   <input type="submit" value="Submit" />
               </form>
           </div>
            <h1>CURRENT USER IS:</h1>
            {/*<h1>*/}
            {/*    {this.props.userLogin.username ? this.props.userLogin.username : ""}*/}
            {/*</h1>*/}
            <button onClick={this.onClickGetCurrentUser}>Get Current User (Check Console)</button>
            <br/>
            <button onClick={this.onClickFetchUsers}>FETCH USERS</button>
            {this.renderUsers()}
        </div>)
    }
}

const  mapStateToProps = ({users, userLogin}: StoreState):{users : User[], userLogin : User} => {
return {users, userLogin}
}

export const App = connect(
    mapStateToProps,
    {fetchAllUsers, logoutUser,loginUser}
)(_App)