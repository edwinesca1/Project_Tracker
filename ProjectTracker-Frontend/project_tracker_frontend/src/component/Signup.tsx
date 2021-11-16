import React, {Component, useState} from "react";
import {loginUser, logoutUser, User} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import axios from "axios";
import '../Profilepic.css';


interface SignupProps {
    userLogin: User;
}

const _Signup: React.FunctionComponent<SignupProps> = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [profpic, setProfpic] = useState("");
    const [warning, setWarning] = useState("");
    const [profileImg, setProfileImg] = useState("");
    

    const localDBUrl = `http://3.144.217.113:8080/api/users/save`;
    const signUpUser = async (e: any) => {
        e.preventDefault()
        //-------------------------After saving the profile picture AWS S3
        let user: User = {
            user_id: 0,
            email,
            firstname,
            lastname,
            password,
            profpic,
            userRole: "USER",
            username
        }
        const resp = await axios.post<User>(localDBUrl, user);
        if (resp.data.user_id !== 0) {
            setWarning(resp.data.username + " Was Created You May Login Now");
            const welcomeEmail = {
                to: resp.data.email,
                subject: "Project Tracker Welcome Email!",
                content: `Welcome User ${resp.data.username} To Project Tracker You May Login now to see all of your Projects and Current Tasks 
                Thanks for Signing up!
                 Contact us at Admin@projecttracker.com`
            }
            await axios.post("http://3.144.217.113:8080/api/users/email", welcomeEmail);

        } else {
            setWarning("User Coulndt be Created something went wrong!!!")
        }
    }

    //-------method to preview the uploaded file by the user and saving it in the S3 bucket
   const imageHandler = async (e:any) => {
        console.log("in imageHandler method");
        setProfileImg(URL.createObjectURL(e.target.files[0]));

        //setting up the file to ve saved in S3 bucket (api is expecting a multipart file)
        const data = new FormData();
        data.append("file", e.target.files[0]);
        
        const apiRespose = await fetch("http://ec2-3-140-252-233.us-east-2.compute.amazonaws.com:9090/file/upload", {
        //mode: 'no-cors',
        method: "POST",
        body: data
        });

        apiRespose.text().then(function (text) {
        //Getting the profilepic name from the api String response
        var noSpacesString= text.replace(/ /g,'');
        const profPicName = noSpacesString.split(':')[1];
        console.log(profPicName);
        setProfpic(profPicName);
        });

    };
       

    return (
        
        <div>
            <form onSubmit={signUpUser}>
                <h3>Sign Up</h3>
                <h2>{warning}</h2>
                <div className="form-group">
                        <div className="page">
                        <div className="container">
                            <div className="img-holder">
                                <img src={profileImg || "https://projecttrackerbucket.s3.us-west-1.amazonaws.com/default-profile-pic.jpg"} alt="preview image" id="img" className="img" />
                            </div>
                            <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
                            <div className="label">
                                <label className="image-upload" htmlFor="input">
                                    
                                    Choose your Photo
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" onChange={(e) => setFirstname(e.target.value)}
                           placeholder="First name" name="firstname" required/>
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name"
                           onChange={(e) => setLastname(e.target.value)} name="lastname" required/>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username"
                           onChange={(e) => setUsername(e.target.value)} name="username" required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                           onChange={(e) => setEmail(e.target.value)} name="email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           onChange={(e) => setPassword(e.target.value)} name="password" required/>
                </div>
                <br/>
                <input type="submit" className="form-control btn btn-primary btn-block" value={"Sign up"}/>
                <p className="forgot-password text-right">
                    Already registered <NavLink to={"/login"}>sign in?</NavLink>
                </p>
            </form>
        </div>
    );
}

const mapStateToProps = ({userLogin}: StoreState): { userLogin: User } => {
    return {userLogin}
}

export const Signup = connect(
    mapStateToProps,
    {}
)(_Signup)