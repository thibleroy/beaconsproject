import {Document} from 'mongoose';
import {IBeacon} from 'lib';

export interface IBeaconDocument extends Document {
  // properites
  uuid: string,
  minor: number,
  major: number,
  name: string,
  id_client: string,
  id_content?: string
  // methods
  convert():IBeacon
};