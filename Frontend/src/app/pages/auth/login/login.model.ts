
export interface loginUser{
    error:boolean,
    message?:String,
    data?:{
  
    email : String,
    password: String,
    token:String,
    tokenExpiryDate:String
    }
}