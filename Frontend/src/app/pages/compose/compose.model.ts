
export interface composeEmail{
    error:boolean,
    message?:String,
    data?:{
    to: String,
   subject: String,
    content:String,
    }
}