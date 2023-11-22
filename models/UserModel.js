// Dependencies
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    phone : {
        type : Number,
        require : true,
    },
    image : {
        type : String,
        require : true,
    }
})

const User = mongoose.model('User', userSchema) ;

export default User ;
