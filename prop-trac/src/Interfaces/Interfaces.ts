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