const User = require('../dao/models/User.js')
const {UserDTO} = require('../dto/User.dto.js')
const {userService} = require('../services/index.js')
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res) => {
    const {first_name, last_name, email, password} = req.body

    try {
        const hashedpw = await bcrypt.hash(password, 12)
        
        if(!first_name || !last_name || !email || !password) return res.status(400).send({error:"Error", message: "Todos los datos son necesarios"})
        const user = {
            first_name,
            last_name,
            email,
            password: hashedpw
        };  
            // Usar el DTO para obtener un objeto token del usuario
        const userToken = UserDTO.getUserTokenFrom(user);
            
            // Guardar el usuario en la base de datos
        const newUser = await userService.create(user);
        req.session.user = newUser
        res.status(201).json({
            status: "success",
            payload: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: "No se pudo signupear"
        })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await userService.getBy({email})

        if(!user) return res.status(400).json({
            status:"failed",
            message: "User email not found"
        })

        const isCorrect = await bcrypt.compare(password, user.password)
        if(isCorrect) {
            req.session.user = user
            res.status(200).json({
                status:"success",
                message:"Logged in"
            })
        }else{
            res.status(400).json({
                status:"error",
                message:"Incorrect password"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failed",
            
        })
        console.log(error)
    }
}