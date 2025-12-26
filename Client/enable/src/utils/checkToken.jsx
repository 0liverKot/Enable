const CheckToken = () => {

    const token = localStorage.getItem("JwtToken")
    
    if(Object.is(token, null)) {
        return false;
    }

    return true
}

export default CheckToken;