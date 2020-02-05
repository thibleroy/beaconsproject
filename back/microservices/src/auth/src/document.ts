import {Document, Model } from 'mongoose';
import {IUser} from 'lib';

export interface IUserDocument extends Document {
  // properites
  name: string,
  email: string,
  password: string,
  id_client : string,
  tokens : string[]
  // methods
  generateAuthToken(): string
};

export interface IUserModel extends Model<IUserDocument> {
// statics
 findByCredentials(email:string, password:string): IUserDocument;
}

export function convert(user : IUserDocument): IUser {
  return {
    id_user : user._id,
    email : user.email,
    name : user.name,
    password : user.password,
    id_client : user.id_client
  }
}