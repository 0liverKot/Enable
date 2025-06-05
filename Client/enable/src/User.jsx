import React from "react";

const User = () => {

    const[name, setName] = useState('');
    
    const handleSubmit = (event) => {
        if(event.target.value != name) {
            setName(event.target.value)
        }        
    }

    return(
    <Container>
    <form onSubmit={handleSubmit}>
        <input type="text" id="name-input" value={name}></input><br></br>
        <input type="submit" value="Submit"></input><br></br>
    </form>   

    {name} 
    
    </Container>
    );
};

export default User;

