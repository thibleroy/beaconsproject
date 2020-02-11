import {IUserDocument,IUserModel} from './document';
import {ENV} from 'lib';
import {InitiateMongoServer} from 'msconnector';
import {sign} from 'jsonwebtoken';
import {Schema, model} from 'mongoose';
import {compare,hash} from 'bcryptjs';
import {IUser} from 'lib';

InitiateMongoServer(ENV.db_url+':'+ENV.db_port+'/'+ENV.db_name)

const UserSchema: Schema = new Schema({
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

UserSchema.methods.generateAuthToken = async function() : Promise<string> {
    // Generate an auth token for the user
    const user = this
    const token = sign({_id: user._id}, ENV.jwt_key)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.pre<IUserDocument>('save', async function () {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await hash(user.password, 8)
    }
    return true
})

UserSchema.statics.findByCredentials = async function (email:string, password:string):Promise<IUserDocument>{
    // Search for a user by email and password.
    const user = await UserModel.findOne({email})
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

UserSchema.methods.convert = function() : IUser {
    return {
        id_user : this._id,
        email : this.email,
        name : this.name,
        password : this.password,
        id_client : this.id_client
      }
}

export const UserModel = model<IUserDocument, IUserModel>('user', UserSchema);
