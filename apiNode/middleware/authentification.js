import jwt from 'jsonwebtoken'
const tokenSecret = 'mysecret'

const verificationDroit =  (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    if (!token) res.status(403).json({error: "please provide a token"})
    else {
        jwt.verify(token, tokenSecret, (err, decoded) => {
            if (err) res.status(403).json({error: "invalid token"})
            else {
                req.user = decoded
                //suite des verifications
                next()
            }
        })
    }
}

const droitAdmin= (req, res, next) => {
    if (req.user.idRole === 1) next()
    else res.status(403).json({error: "vous n'avez pas les droits admins"})
}
const droitPresta= (req, res, next) => {
    if (req.user.idRole <= 2) next()
    else res.status(403).json({error: "vous n'avez pas les droits prestataires"})
}

const generateToken = (user) => {
    return jwt.sign({data:user}, tokenSecret, {expiresIn: '1h'})
}

export {verificationDroit,droitAdmin,droitPresta, generateToken}