export interface IUser {
    UsernameOrEmail: string,
    Password: string
}

export interface IToken{
    token: string
}

export interface IUserInfo{
    ID: number,
    Username: string,
    Password: string,
    Email: string,
    IsManager: boolean,
    FirstName: string,
    LastName: string
    SecurityAnswer: string,
    SecurityQuestionID: number
}

export interface IForgot{
    UsernameOrEmail: string
}

export interface IPosition {
    lat: number,
    lng: number
}

export interface IResponse {
    UsernameOrEmail: string,
    SecurityAnswer: string
}

export interface IReset{
    UsernameOrEmail: string,
    SecurityAnswer: string,
    NewPassword: string
}