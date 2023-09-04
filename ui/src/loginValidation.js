function validation(values){
    let error = {}
    const email_pat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if(values.email === ""){
        error.email = "Email should not be empty";
    } 
    else if(!email_pat.test(values.email)){
        error.email = "Email didn't match"
    }
    else{
        error.email = ""
    }
    if(values.password === ""){
        error.password = "Password should not be empty";
    } 
    else if(!password_pat.test(values.password)){
        error.password = "Email didn't match"
    }
    else{
        error.password = ""
    }
    return error;

}

export default validation;