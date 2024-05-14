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


export interface ITenant {
    id:              number,
    firstName:       string,
    lastName:        string,
    phone:           number,
    leaseType:       string,
    leaseStart:      string,
    leaseEnd:        string,
    roomInfoID:      number,
    roomRent:        number,
    propertyInfoID:  number,
    houseNumber:     number,
    street:          string,
    city:            string,
    zip:             number,
    state:           string,
    houseOrRoomType: string,
    houseRent:       number,
    documentID:      number,
    name:            string,
    type:            string,
    content:         string,
    uploadDate:      number,
    managerFirst:    string,
    managerLast:     string,
    managerPhone:    number,
    managerEmail:    string
}


export interface IPropStats {
    firstName: string,
    activeTenants: number;
    openListings:  number;
    properties:    number;
}

export interface IMaintenance {
    id:             number;
    status:         string;
    category:       string;
    priority:       string;
    dateRequested:  string;
    propertyInfoID: number;
}

export interface IRequest {
    id:          number;
    description: string;
    priority:    string;
    category:    string;
    image:       string;
    userID:      number;
}

export interface PrevArr {
    Items: IPrev[]
}

export interface IPrev {
    month:              number;
    expenseTotal:       number;
    revenueTotal:       number;
    profitOrLossAmount: number;
}

export interface IProfOrLoss {
    month:              number;
    expenseTotal:       number;
    revenueTotal:       number;
    profitOrLossAmount: number;
}


export interface IProperties {
    id:              number;
    roomID:          null;
    houseNumber:     string;
    street:          string;
    city:            string;
    zip:             string;
    state:           string;
    houseOrRoomType: string;
    houseRent:       number;
    roomRent:        null;
    rooms:           number;
    baths:           number;
    sqft:            number;
    amenFeatList:    string;
    description:     string;
    tenantID:        number;
    tenantAssigned:  boolean;
}

export interface IAddProp {
    id:              number;
    houseNumber:     string;
    street:          string;
    city:            string;
    zip:             string;
    state:           string;
    houseOrRoomType: string;
    houseRent:       number;
    rooms:           number;
    baths:           number;
    sqft:            number;
    amenFeatList:    string;
    description:     string;
    userID:          number;
    roomsList:       RoomsList[];
}

export interface RoomsList {
    roomRent: number;
}

export interface PropInfo {
    address: string,
    cityState: string,
    income: number,
    expenses: number,
    profit: number,
    rooms: number,
    baths: number,
    sqft: number,
    description: string,
    featsAmen: string,
    roomList: RoomsList[]
}

export interface IAccount {
    id:        number;
    email:     string;
    firstName: string;
    lastName:  string;
    phone:     string;
    role:      string;
    location:  string;
    language:  string;
}


