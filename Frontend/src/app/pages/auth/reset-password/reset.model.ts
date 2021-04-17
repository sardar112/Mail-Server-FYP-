
export interface resetPassword{
    error:boolean,
    message?:String,
    data?:{
    password: String,
    confirmPassword: String,
    token:String,
    }
}