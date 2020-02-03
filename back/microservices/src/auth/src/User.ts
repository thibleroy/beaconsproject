import {Schema, model} from 'mongoose';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema: Schema = new Schema({
    id_beacon: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

/*
UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


UserSchema.methods.findByCredentials = async function (email:String, password:String) => {
    // Search for a user by email and password.
    const user = await UserModel.findOne({ email} )
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, test.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials' )
    }
    return user
}
*/

export const UserModel = model('user', UserSchema);
