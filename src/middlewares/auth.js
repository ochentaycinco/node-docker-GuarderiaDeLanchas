const protect = (req, res, next) => {
    const user = req.session?.user

    if(!user) {
        return res.status(401).json({error:"Failed",message:"Must log in"})
    }

    req.user = user
    next()

}
module.exports = protect