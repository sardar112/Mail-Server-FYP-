export interface Mail{
    message: String;
    data:Data[],
    error:boolean
    //description : String
    //files : String
}
export interface Data{
    _id:String,
    to : String,
    from : String,
    subject : String,
    description : String,
    date:Date
}