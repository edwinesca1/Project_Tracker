import React, {useEffect, useState} from 'react';
import {fetchAllUsers, loginUser, logoutUser, User} from "../redux/actions";
import {LoginType} from "../redux/actions";
import {StoreState} from "../redux/reducers";
import {connect} from "react-redux";
import {Card, Button, CardGroup, Row, Col} from 'react-bootstrap';
import classes from "../component/layout/Layout.module.css";
import axios from "axios";
import '../Profilepic.css';


interface AllUsersProps{
    users: User[];
    fetchAllUsers: Function;
}

const _AdminAllUsers: React.FunctionComponent<AllUsersProps> = (props)=> {

    const [user_id, setUser_id] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [profpic, setProfpic] = useState("");
    const [userRole, setUserRole] = useState("");
    const [warning, setWarning] = useState("");
    const [profileImg, setProfileImg] = useState("");

    const localDBUrl = `http://3.144.217.113:8080/api/users/`;

    useEffect(()=>{

    },[username])

    const renderPic = (profpic: string)  => {
        if (profpic === null){
            return "https://projecttrackerbucket.s3.us-west-1.amazonaws.com/default-profile-pic.jpg";
        }
        if (profpic === ""){
            return "https://projecttrackerbucket.s3.us-west-1.amazonaws.com/default-profile-pic.jpg";
        }
        else {
            return "https://projecttrackerbucket.s3.us-west-1.amazonaws.com/" + profpic;
        }
    }

    let temp: User = {
        user_id,
        email,
        firstname,
        lastname,
        password,
        profpic,
        userRole,
        username
    }

    const updateUser = async (e: User|any) => {
        e.preventDefault()
        setUser_id(e.user_id)
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
        const resp = await axios.put<User>(localDBUrl+user_id, user);
        console.log(resp.data)
        if (resp.data.user_id !== 0) {
            setWarning(resp.data.username + " Was Updated!! ")
        } else {
            setWarning("User Coulndt be Updated!! something went wrong!!!")
        }
    }
    const setUserToUpdateState = (user:User) =>{
        setUser_id(user.user_id);
        setEmail(user.email);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setPassword(user.password);
        setProfpic(user.profpic);
        setUserRole(user.userRole);
        setUsername(user.username);

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
        });

    };


    const renderUpdateUserForm = () : JSX.Element => {
        console.log("UpdateForm Called!!")
        return (
            <div  key={user_id}>
                <div>
                    <form onSubmit={updateUser}>
                        <h3>Update Users Information</h3>
                        <h2>{warning}</h2>
                        <div className="form-group">
                        <img src={renderPic(profpic)} alt="preview image" id="img" className="img" />
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
                                    } }>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        <br/>
                        <input type="submit" className="form-control btn btn-primary btn-block" value={"Update User"}/>
                    </form>
                </div>
            </div>

        )
    }

    const renderUsers = () : JSX.Element[]=> {
        return props.users.map((user: User) => {
            // @ts-ignore
            return (
                <Col>
                <Card key={user.user_id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={renderPic(user.profpic)} />
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                            First Name: {user.firstname}
                            <br/>
                            Last Name: {user.lastname}
                        </Card.Text>
                        <Button onClick={ ()=> setUserToUpdateState(user)} variant="primary" >Update User</Button>
                    </Card.Body>
                </Card>
                </Col>
            );
        });
    }
    const onClickFetchUsers = ():void => {
        props.fetchAllUsers();
    }

    return (
        <div className={classes.sideBarContent}>
            <button onClick={onClickFetchUsers}>FETCH USERS</button>
            {renderUpdateUserForm()}
            <CardGroup>
                <Row xs={2} md={"auto"} lg={"auto"} className="g-4">
                    {renderUsers()}
                </Row>
            </CardGroup>
        </div>
    );
}


const  mapStateToProps = ({users}: StoreState):{users : User[]} => {
    return {users}
}

export const AdminAllUsers = connect(
    mapStateToProps,
    {fetchAllUsers}
)(_AdminAllUsers)
