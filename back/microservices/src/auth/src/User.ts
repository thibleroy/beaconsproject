import {Schema, model} from 'mongoose';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'blabla'

const UserSchema: Schema = new Schema({
    id_user: {
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


UserSchema.methods.save = async function () {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        UserSchema.password = await bcrypt.hash(UserSchema.password, 8)
    }
    return true
}

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.methods.findByCredentials = async function(email:string, password:string) {
    // Generate an auth token for the user
    const user = await UserModel.findOne({ email} )
    if (!user) {
        throw new Error('Invalid login credentials' )
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

export const UserModel = model('user', UserSchema);
