import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {LoginType, loginUser, User} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import axios from "axios";
import '../Profilepic.css';

interface UserHomeComponentProps {
    userLogin: User;
}

const _UserHomeComponent: React.FunctionComponent<UserHomeComponentProps> = props => {
    const [user_id, setUser_id] = useState(props.userLogin.user_id);
    const [username, setUsername] = useState(props.userLogin.username);
    const [password, setPassword] = useState(props.userLogin.password);
    const [email, setEmail] = useState(props.userLogin.email);
    const [firstname, setFirstname] = useState(props.userLogin.firstname);
    const [lastname, setLastname] = useState(props.userLogin.lastname);
    const [profpic, setProfpic] = useState(props.userLogin.profpic);
    const [userRole, setUserRole] = useState(props.userLogin.userRole);
    const [warning, setWarning] = useState("");
    const [profileImg, setProfileImg] = useState("");

    const localDBUrl = `http://3.144.217.113:8080/api/users/`;

    const renderPic = (): string => {
        console.log(profpic);
        if (profpic === null || profpic === "") {
            return "https://projecttrackerbucket.s3.us-west-1.amazonaws.com/default-profile-pic.jpg";
        } else {
            return "https://projecttrackerbucket.s3.us-west-1.amazonaws.com/" + profpic;
        }
    }
    
    useEffect(()=>{

    },[props.userLogin])

    const updateUser = async (e: any) => {
        e.preventDefault()
        let user: User = {
            user_id,
            email,
            firstname,
            lastname,
            password,
            profpic,
            userRole,
            username
        }
        let login :LoginType ={
            username,
            password
        }
        console.log("Before Axios call");
        console.log(profpic);
        const resp = await axios.put<User>(localDBUrl+user_id, user);
        console.log(resp.data)
        if (resp.data.user_id !== 0) {
            loginUser(login);
            setWarning(resp.data.username + " Was Updated!! ")
        } else {
            setWarning("User Coulndt be Updated!! something went wrong!!!")
        }
    }

    const imageHandler = async (e:any) => {
        console.log("in imageHandler method");
        setProfileImg(URL.createObjectURL(e.target.files[0]));

        const data = new FormData();
        data.append("file", e.target.files[0]);
        
        const apiRespose = await fetch("http://ec2-3-140-252-233.us-east-2.compute.amazonaws.com:9090/file/upload", {
        //mode: 'no-cors',
        method: "POST",
        body: data
        });

        apiRespose.text().then(function (text) {
        // do something with the text response 
        var noSpacesString= text.replace(/ /g,'');
        const profPicName = noSpacesString.split(':')[1];
        console.log(profPicName);
        setProfpic(profPicName);
        console.log("After setProfpic");
        console.log(profpic);
        });

    };

    // @ts-ignore
    return (

        <div  key={props.userLogin.user_id}>
            <div>
                <form onSubmit={updateUser}>
                    <h3>Update your information</h3>
                    <h2>{warning}</h2>
                    <div>
                    <img src={renderPic()} alt="preview image" id="img" className="img" />
                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
                            <div className="label">
                                <label className="image-upload" htmlFor="input">
                                    
                                    Choose your Photo
                                </label>
                            </div>
                    </div>
                    <div className="form-group">
                        <label>User ID</label>
                        <input type="text" className="form-control"
                               value={user_id} name="user_id" disabled/>
                    </div>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" onChange={(e) => setFirstname(e.target.value)}
                               value={firstname} name="firstname" required/>
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" value={lastname}
                               onChange={(e) => setLastname(e.target.value)} name="lastname" required/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" value={username}
                               onChange={(e) => setUsername(e.target.value)} name="username" required/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email}
                               onChange={(e) => setEmail(e.target.value)} name="email" required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password}
                               onChange={(e) => setPassword(e.target.value)} name="password" required/>
                    </div>

                    <div className="form-group">
                        <label>User Role</label>
                        <select className={"form-control"} name="userRole"
                                onChange={event =>{
                                    if (event.target.value === "ADMIN"){
                                        setUserRole("ADMIN");
                                    }
                                    if (event.target.value === "ADMIN"){
                                        setUserRole("USER")
                                    }
                                } } defaultValue={userRole}>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </select>
                    </div>
                    <br/>
                    <input type="submit" className="form-control btn btn-primary btn-block" value={"Update User"}/>
                </form>
            </div>
        </div>
    );
}
const mapStateToProps = ({userLogin}: StoreState): { userLogin: User } => {
    return {userLogin}
}

export const UserHomeComponent = connect(
    mapStateToProps,
    {}
)(_UserHomeComponent)