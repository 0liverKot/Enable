import React, { Fragment, useEffect, useState } from "react";
import UserList from "./DataComponents/UserList";

const Data = () => {

    const[name, setName] = useState('');
    const[users, setUsers] = useState([])


    const handleSubmit = (event) => {
        event.preventDefault() // prevent default behaviour, done to prevent refreshing on submission
        console.log(name) 

        const user = {name}

        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        
        }).then(() => {
            console.log("User: " + name + " added")
        }).then(handleShowUsers)
    }

    const handleShowUsers = (event) => {

        fetch("http://localhost:8080/users/getAll")
        .then(response => response.json())
        .then((result) => {
            setUsers(result);
            console.log(users);
        })
    }
    const handleDeleteAllUsers = (event) => {

        fetch("http://localhost:8080/deleteAll", {
            method: "DELETE"
        })
    }

    return(
    <Fragment>
    <form onSubmit={handleSubmit}>
        <input type="text" id="name-input" defaultValue={name} onChange={(e) => setName(e.target.value)}></input><br></br>
        <input type="Submit" defaultValue="Submit"></input><br></br>
    </form>   

    <button onClick={handleShowUsers}>show users</button>
    <button onClick={handleDeleteAllUsers}>delete all users</button>
    <UserList users={users}></UserList>
    </Fragment>
    );
};

export default Data; 

