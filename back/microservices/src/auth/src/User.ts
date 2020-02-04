import {Schema, model} from 'mongoose';
import {IUser} from 'lib';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    id_client: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.pre<any>('save', async function () {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    return true
})

UserSchema.statics.findByCredentials = async function (email:string, password:string){
    // Search for a user by email and password.
    const user = await UserModel.findOne(email)
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

export const UserModel = model<any>('user', UserSchema);
