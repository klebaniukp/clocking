export interface IUserData {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    isUserLoggedIn: boolean;
}

export interface IUserModified {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface ITask {
    date: string;
    time: string;
    makerId: string;
    type: string;
}
