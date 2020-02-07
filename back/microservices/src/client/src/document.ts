import {Document} from 'mongoose';
import {IClient} from 'lib';

export interface IClientDocument extends Document {
  // properites
  name: string,
  url:string,
  img:string,
  lat:number,
  lng:number,
  address:string
  // methods
  convert():IClient
};