export interface IUser {
    UsernameOrEmail: string,
    Password: string
}

export interface IToken{
    token: string
}

export interface IUserInfo{
    Username: string,
    Password: string,
    Email: string,
    IsManager: boolean,
    FirstName: string,
    LastName: string
    SecurityAnswer: string,
    SecurityQuestion: number
}