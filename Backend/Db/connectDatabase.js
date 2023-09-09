import mongoose from "mongoose";


const UserModel = mongoose.model('User',{
    name: String,
    email: String,
    password: String,
}, 'users')

export default UserModel;

export async function connectDatabase(){
       
        mongoose.connect("mongodb://127.0.0.1:27017/raw")
        console.log("connected to db...")
        
}
