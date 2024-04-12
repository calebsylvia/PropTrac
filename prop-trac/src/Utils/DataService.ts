import { IForgot, IReset, IResponse, IToken, IUser, IUserInfo } from "../Interfaces/Interfaces";

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
        if(res.status === 401){
            return false
        }
    }

    const data = await res.json();
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
        return false
    }

    const data = await res.text()
    return data
}

export const answerCheck = async(answerCheck: IResponse) => {
    const res = await fetch(url + "/Password/ResponseForReset", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(answerCheck)
    })

    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data
}

export const changePassword = async(passChange: IReset) => {
    const res = await fetch(url + "/Password/ResetPassword", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(passChange)
    })

    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data;
}

export const getUserInfo = async(UsernameOrEmail:string) => {
    const res = await fetch(url + `/User/GetUserInfoByUsernameOrEmail/${UsernameOrEmail}`)

    if(!res.ok){
        return false
    }
    const data = await res.json()
    return data
}


export const getTenantInfo = async(ID: number) => {
    const res = await fetch(url + `/Tenant/GetTenantDashboardInfo/${ID}`);
    const data = await res.json()
    return data[0];
}

export const getListingStats = async(userId: number) => {
    const res = await fetch(url + `/Manager/GetPropertyStatsByUserID/${userId}`)
    const data = await res.json()
    return data;
}

export const getMaintenance = async(userId: number) => {
    const res = await fetch(url + `/Manager/GetMaintenanceStatsByUserID/${userId}`)
    const data = await res.json()
    return data
}