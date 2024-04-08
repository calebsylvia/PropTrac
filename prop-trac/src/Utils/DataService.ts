import { IForgot, IToken, IUser, IUserInfo } from "../Interfaces/Interfaces";

const url = 'https://proptracapi.azurewebsites.net';


export const createAccount = async(createdUser: IUserInfo) => {
    const res = await fetch( url + "/User/AddUser/", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body:JSON.stringify(createdUser)
    });

    if(!res.ok){
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data)
}


export const login = async(loginUser: IUser) => {
    const res = await fetch( url + "/User/Login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(loginUser)
    });

    if(!res.ok){
        const message = "An Error has occured " + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;
}

export const checkToken = () => {
    let result = false;

    let localData = localStorage.getItem("Token");

    if(localData !=null){
        result = true
    }
    return result
}

export const getSecurityQuestions = async() => {
   const res = await fetch(url + '/Password/SecurityQuestionList');
   const data = res.json()
   return data;
}

export const passwordRequest = async(UsernameOrEmail: IForgot) => {
    const res = await fetch( url + "/Password/RequestReset", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(UsernameOrEmail)
    });

    if(!res.ok){
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.text()
    return data
}

