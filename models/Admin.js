import mongoose from 'mongoose';
import validator from 'validator';

const AdminSchema = mongoose.Schema({

    Email : {
        type : String ,
        required:true,
        unique:true,
        validate: [validator.isEmail, 'Please enter a valid email address'],

    },
    Password : {
        type : String,
        // required: true,
        unique: true,

    },
    

},
{timestamps: true}

);


const UserModel = mongoose.model("Admin", AdminSchema);

export default UserModel;
