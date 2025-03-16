const { axiosInstance } = require(".");

// Regsiter a new User

export const RegisterUser = async (payload)=>{
   try {
        const response = await axiosInstance.post('api/users/register' , payload)
        return response.data
   } catch (error) {
      return error
   }
}


export const LoginUser = async (payload)=>{
   try {
      const response = await axiosInstance.post('api/users/login' , payload)
      return response.data
 } catch (error) {
    return error
 }
}

//get Current User
export const GetCurrentUser = async () => {
   try {
       const response = await axiosInstance.get("api/users/get-current-user");
       console.log("user id is :"+ JSON.stringify(response.data.data._id));
       localStorage.setItem('userId' , response.data.data._id);
       
       return response.data;
   } catch (error) {
       return error;
   }
}

export const GetUserProfile = async () => {
   try {
     const response = await axiosInstance.get("api/users/profile");
     return response.data;
   } catch (error) {
     return error;
   }
 };
 
 export const UpdateUserProfile = async (payload) => {
   try {
     const response = await axiosInstance.put("api/users/profile", payload);
     return response.data;
   } catch (error) {
     return error;
   }
 };
 