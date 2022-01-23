export interface IUser {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface ITask {
    taskId: string;
    makerId: string;
}
