import UserDetails from "../interfaces/userDetails"
export const ValidateFields = (userdetails:UserDetails)=>{
    const { first_name, last_name,email,phone,password,confirm_password} = userdetails;
    if (!first_name||!last_name||!email||!phone||!password||!confirm_password) return false
    return true
}
export const ValidateEmail = (email: string) => {
    const re = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/;
    return re.test(email);
  };  
export const ValidatePhone = (phone: string) => {
    const regex = /^(?:\+9725[84320]\d{7}|05[84320]\d{7})$/;
    return regex.test(phone);
  };
export const ValidatePassword = (password: string , confirm_password:string) => {
    return password===confirm_password;
}

  