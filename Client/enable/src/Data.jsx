import React, { Fragment, useEffect, useState } from "react";

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
        })
    }

    const handleShowUsers = (event) => {

        fetch("http://localhost:8080/users/getall")
        .then(response => response.json())
        .then((result) => {
            setUsers(result);
            console.log(users);
        })
    }

    return(
    <Fragment>
    <form onSubmit={handleSubmit}>
        <input type="text" id="name-input" defaultValue={name} onChange={(e) => setName(e.target.value)}></input><br></br>
        <input type="Submit" defaultValue="Submit"></input><br></br>
    </form>   

    <button onClick={handleShowUsers}>show users</button>

    <ol>
        {users.map((user) => {
            return <li key={user.id}>{user.name}</li>
        })}
    </ol>

    </Fragment>
    );
};

export default Data; 

