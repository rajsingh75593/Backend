import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/FileUpload.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validate - not empty
    // check if user already exit :name, email
    // check for image and check for avtar
    // upload them to cloudinary, avtar
    // create user object - create entery in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { username, email, fullname, password } = req.body
    if ([fullname, email, username, password].some((items) => items?.trim() === "")) {
        throw new ApiError(400, "All Fields are Required")
    }

    const existedUser = User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) {
        throw new ApiError(409, "User: Email and Username already exist ")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const userObj = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(userObj._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Somthing went wrong while registered the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfull")
    )


})

export { registerUser }