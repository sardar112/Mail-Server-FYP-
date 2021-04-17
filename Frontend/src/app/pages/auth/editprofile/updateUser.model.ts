
export interface updateUser{
    error:boolean,
    message?:String,
    data?:{
    firstName:  String,
    lastName:  String,
    password: String,
    confirmPassword: String,
    phone: String,
    gender: String,
    city: String
    }
}