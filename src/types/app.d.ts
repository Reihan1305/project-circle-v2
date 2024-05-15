export interface IErrorObj {
   [key: string]: { statusCode: number; message: string };
}

export interface IProfile {
   username: string,
   photoProfile?: string,
   cover?:string,
   bio?:string
}