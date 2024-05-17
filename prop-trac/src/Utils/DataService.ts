import { IAccount, IAddProp, IDelete, IForgot, IManager, IRequest, IReset, IResponse, IRoom, IToken, IUser, IUserInfo } from "../Interfaces/Interfaces";

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
        return false;
    }

    const data = await res.json();
    console.log(data)
    return data
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
    let localData;

    
     localData = localStorage.getItem("Token");

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

export const addRequest = async(request: IRequest) => {
    const res = await fetch(url + "/Tenant/AddMaintenanceRequest", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(request)
    })
    
    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data;
}

export const addProperty = async(property: IAddProp) => {
    const res = await fetch(url + '/Manager/AddProperty', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
    })

    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data
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

export const getMonthly = async(userId: number, month: number, year: number) => {
    const res = await fetch(url + `/Manager/GetMonthlyProfitOrLoss/${userId}/${month}/${year}`)
    const data = await res.json()
    return data
}

export const getPrevMonths = async(userId: number, month: number, year: number) => {
    const res = await fetch(url + `/Manager/GetPastSixMonthsProfitOrLoss/${userId}/${month}/${year}`)
    const data = await res.json()
    return data
}

export const projectMonths = async(userId: number, month: number, year: number) => {
    const res = await fetch(url + `/Manager/GetProjectedProfitOrLoss/${userId}/${month}/${year}`)
    const data = await res.json()
    return data
}

export const getProperties = async(userId: number) => {
    const res = await fetch(url + `/Manager/GetAllProperties/${userId}`)
    const data = await res.json()
    return data
}

export const getAccountInfo = async(userId: number) => {
    const res = await fetch(url + `/Manager/GetManagerInfo/${userId}`)
    const data = await res.json()
    return data
}

export const editAccount = async(accountInfo: IAccount) => {
    const res = await fetch(url + '/Manager/EditManagerInfo', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(accountInfo)
    })

    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data;
}

export const deleteProp = async(propertyId: IDelete) => {
    const res = await fetch(url + '/Manager/DeleteProperty', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyId)
    })

    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data;
}

export const deleteRoom = async(room: IRoom) => {
    const res = await fetch(url + '/Manager/DeleteRoom', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    })

    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data;
}

export const editProperty = async(property: IAddProp) => {
    const res = await fetch( url + '/Manager/EditProperty', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
    })

    if(!res.ok){
        return false
    }

    const data = await res.json()
    return data;
}