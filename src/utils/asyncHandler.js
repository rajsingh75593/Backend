
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error))
    }


}


export { asyncHandler };










//second method.... 👍


// const asyncHandler = (fun) => async (req, res, next) => {
//     try {
//         await fun(req, res, next)

//     } catch (error) {
//         res.status(error.code || 5000).json({
//             success: false,
//             message: error.message
//         })

//     }

// }

// export { asyncHandler };