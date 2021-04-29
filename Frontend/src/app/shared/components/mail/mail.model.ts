export interface Mail{
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
}