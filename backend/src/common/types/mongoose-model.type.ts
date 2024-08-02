import { Model } from 'mongoose';
import { BaseModel } from './base.model.interface';

export type MongoModel<M> = Model<M> & BaseModel;
