import expressJWT from 'express-jwt'

// verify tai khoan
export const requiredSignin = expressJWT({
    algorithms: ['HS256'],
    secret: 'abc',
    requestProperty: "auth" //req.auth
})

export const isAuth = (req, res, next) => {
    const status = req.profile._id == req.auth._id
    
    if(!status) {
        return res.status(401).json({
            message: "Ban khong co quyen truy cap"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if(req.profile.role == 0) {
        return res.status(401).json({
            message: "Bạn không phải là admin"
        })
    }
    next();
}