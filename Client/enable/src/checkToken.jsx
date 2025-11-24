const CheckToken = () => {

    const token = localStorage.getItem("JwtToken")

    if(token === null) {
        return false;
    }

    return true
}

export default CheckToken;