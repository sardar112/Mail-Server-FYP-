
export interface IUser {
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    recoveryEmail : string,
    userPassword : string,
    confirmPassword : string,
    userPhoneNumber : string,
    userGender : string,
    userCity : string,
    userProfilePicture : string,
}

export interface registerUser{
    error:boolean,
    message:String,
    data?:{
    first_name:  String,
    last_name:  String,
    email : String,
    recovery_email:String,
    password: String,
    confirm_password: String,
    phone_number: String,
    gender: String,
    city: String,
    image:File
    }
}
