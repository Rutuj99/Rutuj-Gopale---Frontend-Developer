import UserModel from '../Db/connectDatabase.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = "Helocvtraada";

function generateToken(userInfo) {
    return jwt.sign(userInfo, JWT_SECRET_KEY)
}

export async function login(email, password) {

    let user = await UserModel.findOne({
        email
    })

    if (!user) {
        throw new Error('User with given email is not present.')
    }

    if (password!==user.password) {
        throw new Error('Password is wrong.')
    }

    user = user.toJSON()
    delete user.password;

    let token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
    })

    return {user,token};
}

export async function register(name, email, password) {

    let already = await UserModel.findOne({
        email
    })

    if (already) {
        throw new Error('User with given email is already present');
    }



    let user = await UserModel.create({
        name, email, 
        password: password
    })


    user = user.toJSON()
    delete user.password;

    return user;
}



export async function getUserById(id) {

    let user = await UserModel.findById(id);

    user = user.toJSON()
    delete user.password;

    return user
}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
}