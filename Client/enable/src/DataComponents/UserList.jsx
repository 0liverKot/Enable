import React from "react";

const UserList = ({users}) => {

    return(
        <ol>
            {users.map((user) => {
                return <li key={user.id}>{user.name}</li>
            })}
        </ol>
    )
}

export default UserList;