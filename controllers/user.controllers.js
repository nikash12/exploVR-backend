import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";


const userRegister = asyncHandler( async (req, res) => {
    const {userName,fullName,password,email,favourites} = req.body
    
    console.log(userName,fullName,password,email,favourites)

    if (
        [fullName, email, userName, password,favourites].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const  user = await User.findOne(
        {
            $or: [{ userName }, { email }]
        }
    )
    if(user){
        console.log(user)
        throw new ApiError(400, "User exists")
    }

    const user1 = await User.create({
        fullName,
        userName,
        password,
        email,
        favourites
    })

    if(!user1){
        throw new ApiError(400, "Error in creating")
    }else{
        new ApiResponse(200,{},"User is created in the DB")
        console.log(user1)
    }
    
});

const userLogin = asyncHandler(async(req,res) => {
    const {userName,password} = req.body
    console.log(userName,password);
    const  user = await User.findOne(
        {
            userName
        }
    )
    if(!user){
        throw new ApiError(400, "User doesnt exists")
    }
    

    const passCheck = await user.checkPassword(password)
    console.log(user,passCheck);
    if(!passCheck){
        throw new ApiError(400, "Password is Incorrect")
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken
    const userN = await user.save({validateBeforeSave:false})
     
    const options = {
        httpOnly:true,
        secure:true
    }
    console.log(userN)
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{user:userN,accessToken: accessToken},"User is loggedIn")
    )
});

const userFav = asyncHandler(async(req,res) => {
    const {userName,favourite} = req.body;
    const user = User.find({userName:userName})
    if(!user){
        throw new ApiError(404,"user not found");
    }
    user.favourite = favourite
    user.save()
});

const userLogout = asyncHandler(async(req,res) => {
    
});

export { userRegister,userLogin,userFav };
