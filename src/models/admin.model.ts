import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  _id: String,
  email: string;
  username: string;
  password: string;
  isEnabled?: boolean;
  createDatetime?: Date,
  modifyDatetime?: Date,
}

const AdminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false, default: 'anon' },
  password: { type: String, required: true },
  isEnabled: { type: Boolean, required: false, default: true },
  createDatetime: { type: Date, required: false, default: new Date()},
  modifyDatetime: { type: Date, required: false, default: new Date()}
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
