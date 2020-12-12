import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  phone: string;
  password: string;
  name: string;
  isEnabled: boolean;
  createDatetime: Date,
  modifyDatetime: Date,
}

const ClientSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false, default: 'Гость' },
  isEnabled: { type: Boolean, required: true, default: true },
  createDatetime: { type: Date, required: true, default: new Date()},
  modifyDatetime: { type: Date, required: true, default: new Date()}
});

export default mongoose.model<IClient>('Client', ClientSchema);
